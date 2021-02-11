const getApiKeyAssociatedWithEmailQuery = () => {
  return `SELECT api_key FROM api_key ak
    INNER JOIN users_api_key uak ON uak.api_key_id = ak.api_key_id
    INNER JOIN user_master um ON um.user_id = uak.users_id
    WHERE email = $1`;
};

const createNewAPIKeyQuery = () => {
  return `INSERT INTO api_key (api_key, last_used, created_on) VALUES ($1, $2, $3);`;
};

const invalidateAPIKeyQuery = () => {
  return `DELETE FROM users_api_key WHERE api_key_id = (SELECT api_key_id FROM api_key WHERE api_key.api_key = $1)`;
};

const associateApiKeyWithUserQuery = () => {
  return `INSERT INTO users_api_key (api_key_id, users_id) VALUES ((SELECT api_key_id FROM api_key WHERE api_key.api_key = $1), (SELECT users_id FROM user_master WHERE user_master.email = $2))`;
};

const getEmailFromApiKeyQuery = () => {
  return `SELECT um.email
    FROM user_master um
    INNER JOIN users_api_key uak ON uak.users_id = um.users_id
    INNER JOIN api_key ak ON ak.api_key_id = uak.api_key_id`
}

module.exports = {
  getApiKeyAssociatedWithEmailQuery,
  createNewAPIKeyQuery,
  invalidateAPIKeyQuery,
  associateApiKeyWithUserQuery,
  getEmailFromApiKeyQuery
};
