const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./auth/passport");
const authRouter = require('./routes/auth');
const cardRouter = require('./routes/cards');
const authenticateUser = require('./middleware/authentication');





const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');





const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cards', authenticateUser, cardRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
