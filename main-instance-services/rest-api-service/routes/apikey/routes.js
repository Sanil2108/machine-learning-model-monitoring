const router = require("express").Router();
const {
  schemaValidationMiddleware,
  apiForwardMiddleware,
  basicAuthorizationMiddleware,
} = require("../../utils/middleware");
const { createApiKeySchema, invalidateApiKeySchema } = require("./schema");
const { ROUTES } = require("../../utils/constants");
const { registerNewApiKey, invalidateExistingApiKey } = require("./api");

router.post(
  `${ROUTES.API_KEY.REGISTER_API_KEY}`,
  schemaValidationMiddleware(createApiKeySchema),
  basicAuthorizationMiddleware,
  apiForwardMiddleware(registerNewApiKey)
);

router.post(
  `${ROUTES.API_KEY.INVALIDATE_API_KEY}`,
  schemaValidationMiddleware(invalidateApiKeySchema),
  basicAuthorizationMiddleware,
  apiForwardMiddleware(invalidateExistingApiKey)
);

module.exports = router;
