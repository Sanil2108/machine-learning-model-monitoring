const getApiKeyAssociatedWithEmailQuery = () => {
  return `SELECT api_key FROM api_key ak
    INNER JOIN users_api_key uak ON uak.api_key_id = ak.api_key_id
    INNER JOIN user_master um ON um.user_id = uak.users_id
    WHERE email = $1`
}

module.exports = {
  getApiKeyAssociatedWithEmailQuery
}
