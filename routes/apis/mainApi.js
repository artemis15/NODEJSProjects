const express = require('express');
const v1ApiController = require('./v1');

let mainApiRouter = express.Router();
mainApiRouter.use('/v1',v1ApiController);

module.exports = mainApiRouter;