const atob = require("atob");
const {validatePassword, checkFormatOfUuid, createUUID} = require("../utils/utils");
const { confirmIfApiKeyIsValid } = require("../routes/apikey/api");
const {getPasswordHashFromEmail, } = require("../routes/users/dbOperations");
const rabbitMqDriver = require('../drivers/rabbitMqDriver');
const { getEmailFromApiKey } = require("../routes/apikey/dbOperations");

/**
 * Takes a Joi.Schema object and returns a middleware function that would validate the body of the request,
 * and depending on the result of the validation, return an appropriate response
 * @param  {Object} schema
 * 
 * @returns {Function}
 */
const schemaValidationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validate(req.body);
      if (value.error) {
        res.status(400).send(value.error);
        return;
      } else {
        next();
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Schema validation failed. ");
    }
  };
};

/**
 * Takes a Joi Schema object and returns a middleware function that would validate the body of the request,
 * and depending on the result of the validation, return an appropriate response
 * @param  {Object} schema A Joi Schema object
 * 
 * @returns {Function}
 */
const headerValidationMiddleware = (schema) => {
  return async (req, res, next) => {
    try {
      const value = await schema.validate(req.headers);
      if (value.error) {
        res.status(400).send(value.error);
        return;
      } else {
        next();
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Schema validation for headers failed. ");
    }
  };
};

/**
 * Checks whether a request headers contains the required correct details for basic authorization.
 * Adds a user field in the request object if the details are correct.
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next
 * 
 * @returns {Promise}
 */
const basicAuthorizationMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).send("Authorization failed. ");
    return;
  }

  try {
    const base64Token = req.headers.authorization.split(' ')[1];
    const [email, password] = atob(base64Token).split(":");
    req.user = {
      email,
    };

    const response = await getPasswordHashFromEmail({email});
    if (!response.success) {
      res.status(401).send("Authorization failed. ");
      return;
    }

    const passwordHash = response.data.passwordHash;
    const isPasswordValid = await validatePassword(password, passwordHash);
  
    if (!isPasswordValid) {
      res.status(401).send("Authorization failed. ");
      return;
    }
    
    next();
  } catch (exception) {
    console.error(exception);
    res.status(500).send("Authorization failed. ");
  }
};

/**
 * Checks whether a request headers contains the required correct details for api key authorization.
 * Adds the api key field in the request object if the details are correct.
 * @param  {Object} req
 * @param  {Object} res
 * @param  {Function} next
 * 
 * @returns {Promise}
 */
const apiKeyAuthorisationMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(400).send("Authorization Failed.");
    return;
  }

  try {
    const apiKey = req.headers.authorization;

    if (!checkFormatOfUuid(apiKey)) {
      res.status(400).send("API Key format is incorrect");
      return;
    }

    const getEmailResponse = await getEmailFromApiKey({apiKey});
    if (!getEmailResponse.success) {
      res.status(404).send("No such API key exist");
      return;
    }
    
    req.apiKey = apiKey;

    next();
  }
  catch (ex) {
    console.error(ex);
    res.status(500).send("Authorization Failed.");
  }
}

/**
 * Returns a middleware function that would automatically log requests and responses for api calls.
 * @param  {Function} apiFunction
 * 
 * @returns {Function}
 */
const apiForwardMiddleware = (apiFunction) => {
  return async (req, res, next) => {
    const body = req.body;
    const headers = req.headers;
    const requestUUID = createUUID();
    const requestIPAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    rabbitMqDriver.sendMessageToLoggingService(JSON.stringify({
      type: 'api-request',
      data: {
        'api-endpoint': req.originalUrl,
        'ip-address': requestIPAddress,
        'request-uuid': requestUUID,
        'request': {
          'timestamp': (new Date()).getTime(),
          'headers': headers,
          'body': body,
          'method': req.method
        }
      }
    }));

    const response = await apiFunction({
      ...req,
      headers,
      body,
      requestUUID
    }, res);

    rabbitMqDriver.sendMessageToLoggingService(JSON.stringify({
      type: 'api-response',
      data: {
        'api-endpoint': req.originalUrl,
        'ip-address': requestIPAddress,
        'request-uuid': requestUUID,
        'response': {
          'timestamp': (new Date()).getTime(),
          'status': res.status,
          'data': response,
        }
      }
    }));

    if (response) {
      res.json(response.data);
    }

    next();
  };
};

module.exports = {
  schemaValidationMiddleware,
  headerValidationMiddleware,
  basicAuthorizationMiddleware,
  apiKeyAuthorisationMiddleware,
  apiForwardMiddleware
}