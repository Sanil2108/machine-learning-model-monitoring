const getPasswordHashQuery = () => {
  return `SELECT password_hash FROM user_master WHERE email = $1`;
};

const getNumberOfUsersWithEmailQuery = () => {
  return `SELECT COUNT(*) FROM user_master WHERE email = $1`;
};

const createUserQuery = () => {
  return `INSERT INTO user_master (email, password_hash, registered_at)
  VALUES (
      $1,
      $2,
      $3
    );`;
};

const deleteUserQuery = () => {
  return `DELETE FROM user_master WHERE email = $1`;
};

module.exports = {
  getPasswordHashQuery,
  getNumberOfUsersWithEmailQuery,
  createUserQuery,
  deleteUserQuery,
};
