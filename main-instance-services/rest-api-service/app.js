require("dotenv").config();
const cors = require('cors');
const bodyParser = require('body-parser');

const {ROUTES} = require('./utils/constants');

(async () => {
  const app = require("express")();

  app.use(cors());
  app.use(bodyParser.json());

  const postgresDriver = require("./drivers/postgresDriver");
  await postgresDriver.initialise();

  // const rabbitMqDriver = require("./drivers/rabbitMqDriver");
  // await rabbitMqDriver.initialise();

  const s3Driver = require("./drivers/s3Driver");
  await s3Driver.initialise();

  const userRouter = require('./routes/users/routes');
  const apiKeyRouter = require('./routes/apikey/routes');

  app.use(ROUTES.USERS.BASE_URL, userRouter);
  app.use(ROUTES.API_KEY.BASE_URL, apiKeyRouter);

  const PORT = process.env.PORT;
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
})();
