const postgresDriver = require("../../drivers/postgresDriver");
const { getNumberOfUsersWithEmailQuery, createUserQuery, getPasswordHashQuery, deleteUserQuery } = require("./sqlQueries");

const getPasswordHashFromEmail = async ({email}) => {
  const query = getPasswordHashQuery();

  const { rows } = await postgresDriver.query(query, [email]);
  if (rows.length === 0) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    data: {
      passwordHash: rows[0].password_hash
    }
  };
}

const doesUserWithEmailAlreadyExist = async ({email}) => {
  const query = getNumberOfUsersWithEmailQuery();

  const { rows } = await postgresDriver.query(query, [email]);
  if (rows.length === 0) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    data: {
      exists: rows[0].count > 0
    }
  };
}

const createUser = async ({email, hashedPassword, registeredAt}) => {
  const query = createUserQuery();

  const { rowCount } = await postgresDriver.query(query, [email, hashedPassword, registeredAt]);
  if (rowCount === 0) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}

const deleteUser = async ({email}) => {
  const query = deleteUserQuery();

  const { rowCount } = await postgresDriver.query(query, [email]);
  if (rowCount === 0) {
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}

module.exports = {
  getPasswordHashFromEmail,
  doesUserWithEmailAlreadyExist,
  createUser,
  deleteUser
}
