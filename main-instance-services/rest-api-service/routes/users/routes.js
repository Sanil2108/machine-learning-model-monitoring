const router = require("express").Router();
const {
  schemaValidationMiddleware,
  apiForwardMiddleware,
  basicAuthorizationMiddleware,
} = require("../../utils/middleware");
const { userRegisterSchema, deleteUserSchema } = require("./schema");
const {ROUTES} = require('../../utils/constants');

const { registerUser, removeUser } = require("./api");

router.post(
  `${ROUTES.USERS.REGISTER_USER}`,
  schemaValidationMiddleware(userRegisterSchema),
  apiForwardMiddleware(registerUser)
);

router.delete(
  `${ROUTES.USERS.DELETE_USER}`,
  schemaValidationMiddleware(deleteUserSchema),
  basicAuthorizationMiddleware,
  apiForwardMiddleware(removeUser)
);

module.exports = router;
