const { hashPassword } = require("../../utils/utils");
const { createUser, doesUserWithEmailAlreadyExist } = require("./dbOperations");

const registerUser = async ({body}, res) => {
  const {email, password} = body;

  const doesUserWithEmailAlreadyExistResponse = await doesUserWithEmailAlreadyExist({email});
  if (!doesUserWithEmailAlreadyExistResponse.success) {
    res.status(500).send("Failed to create a user");
    return;
  }

  if (doesUserWithEmailAlreadyExistResponse.data.exists) {
    res.status(400).send("User with this email already exists");
    return;
  }

  const hashedPassword = await hashPassword(password);

  const createUserResponse = await createUser({
    email,
    hashedPassword,
    registeredAt: (new Date()).toISOString()
  });
  
  if (!createUserResponse.success) {
    res.status(500).send("Could not create the user");
  }

  res.status(201)

  return {}
}

const deleteUser = async ({user}, res) => {
  const {email} = user;

  // await 

}

module.exports = {
  registerUser,
  deleteUser
}