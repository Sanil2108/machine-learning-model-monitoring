const router = require("express").Router();
const {
  schemaValidationMiddleware,
  apiForwardMiddleware,
  basicAuthorizationMiddleware,
} = require("../../utils/middleware");
const { userRegisterSchema, deleteUserSchema } = require("./schema");
const {ROUTES} = require('../../utils/constants');

const { registerUser, deleteUser } = require("./api");

router.post(
  `${ROUTES.USERS.REGISTER_USER}`,
  schemaValidationMiddleware(userRegisterSchema),
  apiForwardMiddleware(registerUser)
);

router.delete(
  `${ROUTES.USERS.DELETE_USER}`,
  schemaValidationMiddleware(deleteUserSchema),
  basicAuthorizationMiddleware,
  apiForwardMiddleware(deleteUser)
);

module.exports = router;
