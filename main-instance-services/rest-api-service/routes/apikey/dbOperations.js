const postgresDriver = require("../../drivers/postgresDriver");
const { createNewAPIKeyQuery, invalidateAPIKeyQuery, associateApiKeyWithUserQuery } = require("./sqlQueries");

const disassociateAPIKeyWithUser = async ({apiKey}) => {
  const query = invalidateAPIKeyQuery();

  const { rowCount } = await postgresDriver.query(query, [apiKey]);
  if (rowCount === 0) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}

const createNewAPIKey = async (driver, {apiKey, createdAt}) => {
  const query = createNewAPIKeyQuery();

  const { rowCount } = await driver.query(query, [apiKey, null, createdAt]);
  if (rowCount === 0) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}

const associateApiKeyWithUser = async (driver, {apiKey, email}) => {
  const query = associateApiKeyWithUserQuery();

  const { rowCount } = await driver.query(query, [apiKey, email]);
  if (rowCount === 0) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}

const createAndAssociateUserWithNewAPIKey = async ({apiKey, createdAt, email}) => {
  await postgresDriver.doInTransaction(async (client, rollback) => {
    const createApiKeyResponse = await createNewAPIKey(client, {apiKey, createdAt});
    if (!createApiKeyResponse.success) {
      await rollback();
      return;
    }

    const associateApiKeyWithUserResponse = await associateApiKeyWithUser(client, {apiKey, email});
    if (!associateApiKeyWithUserResponse.success) {
      await rollback();
      return;
    }
  });

  return {
    success: true
  }
}

module.exports = {
  disassociateAPIKeyWithUser,
  createAndAssociateUserWithNewAPIKey
}