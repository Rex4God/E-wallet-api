const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRouter = require('./routes/auth');
const cardRouter = require('./routes/cards');
const merchantRouter = require('./routes/merchant')
const  walletRouter  = require('./routes/wallet')
const categoryRouter  = require('./routes/category')
//const authenticateUser =require("./middleware/passport");





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
//Route Middleware
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/cards', cardRouter);
app.use('/api/v1/merchants', merchantRouter)
app.use('/api/v1/wallet', walletRouter)
app.use('/api/v1/category', categoryRouter)


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
