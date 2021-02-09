const {
  getApiKeyAssociatedWithEmailQuery
} = require('./sqlQueries');

const confirmIfApiKeyIsValid = async ({apiKey, email}) => {
  const query = getApiKeyAssociatedWithEmailQuery();

  const {rows} = await postgresDriver.query(query, [email]);
  const validAPIKey = false
  for (let i = 0; i < rows.length; i += 1) {
    if (rows[i].api_key === apiKey) {
      validAPIKey = true;
      break;
    }
  }

  return {
    successful: true,
    data: {
      valid: validAPIKey,
    }
  }
};

module.exports = {
  confirmIfApiKeyIsValid
};