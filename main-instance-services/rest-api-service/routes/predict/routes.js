const router = require("express").Router();
const {
  schemaValidationMiddleware,
  apiForwardMiddleware,
  apiKeyAuthorisationMiddleware,
} = require("../../utils/middleware");
const { predictSchema } = require("./schema");
const { ROUTES } = require("../../utils/constants");
const { predict } = require("./api");

router.post(
  `${ROUTES.PREDICT.PREDICT}`,
  schemaValidationMiddleware(predictSchema),
  apiKeyAuthorisationMiddleware,
  apiForwardMiddleware(predict)
);

module.exports = router;