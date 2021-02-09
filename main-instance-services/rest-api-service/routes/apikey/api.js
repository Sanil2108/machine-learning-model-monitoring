const { getApiKeyAssociatedWithEmailQuery } = require("./sqlQueries");

const {
  disassociateAPIKeyWithUser,
  createAndAssociateUserWithNewAPIKey,
} = require("./dbOperations");
const { createAPIKey } = require("../../utils/utils");

const confirmIfApiKeyIsValid = async ({ apiKey, email }) => {
  const query = getApiKeyAssociatedWithEmailQuery();

  const { rows } = await postgresDriver.query(query, [email]);
  const validAPIKey = false;
  for (let i = 0; i < rows.length; i += 1) {
    if (rows[i].api_key === apiKey) {
      validAPIKey = true;
      break;
    }
  }

  return {
    success: true,
    data: {
      valid: validAPIKey,
    },
  };
};

const registerNewApiKey = async ({ user }, res) => {
  const { email } = user;

  const apiKey = createAPIKey();

  const registerApiKeyResponse = await createAndAssociateUserWithNewAPIKey({
    email,
    apiKey,
    createdAt: new Date().toISOString(),
  });

  if (!registerApiKeyResponse.success) {
    res.status(500).send("Could not create a new API key");
    return;
  }

  res.status(201);
  return {data: {apiKey}};
};

const invalidateExistingApiKey = async ({ body }, res) => {
  const {apiKey} = body;

  const invalidateAPIKeyResponse = await disassociateAPIKeyWithUser({ apiKey });

  if (!invalidateAPIKeyResponse.success) {
    res.status(500).send("Could not remove the api key");
    return;
  }

  return {};
};

module.exports = {
  confirmIfApiKeyIsValid,
  registerNewApiKey,
  invalidateExistingApiKey,
};
