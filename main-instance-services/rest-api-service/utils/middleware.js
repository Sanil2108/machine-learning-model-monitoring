const atob = require("atob");
const {validatePassword, checkFormatOfUuid} = require("../utils/utils");
const { confirmIfApiKeyIsValid } = require("../routes/apikey/api");
const {getPasswordHashFromEmail, } = require("../routes/users/dbOperations");
const rabbitMqDriver = require('../drivers/rabbitMqDriver');

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

    // TODO:
    // const getEmailResponse = await getEmailFromApiKey({apiKey});
    // if (!getEmailResponse.success) {
    //   res.status(404).send("No such API key exist");
    //   return;
    // }
    // const email = getEmailResponse.data.email;
    
    // const confirmIfApiKeyIsValidResponse = await confirmIfApiKeyIsValid({apiKey, email});
    // if (!confirmIfApiKeyIsValidResponse.success) {
    //   res.status(401).send("API Key is not valid.");
    //   return;
    // }
    
    // req.user = {
    //   email
    // }
    req.apiKey = apiKey;

    next();
  }
  catch (ex) {
    console.error(ex);
    res.status(500).send("Authorization Failed.");
  }
}

const apiForwardMiddleware = (apiFunction, functionTitle) => {
  return async (req, res, next) => {
    const body = req.body;
    const headers = req.headers;

    // rabbitMqDriver.sendMessageToLoggingService(JSON.stringify());

    const response = await apiFunction({
      ...req,
      headers,
      body,
    }, res);

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