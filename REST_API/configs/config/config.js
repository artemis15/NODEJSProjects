const _ = require('lodash');
const env = process.env.Node_ENV || 'local';
const envConfig = require('./' + env);
let defaultConfig = {
  env: env
};
module.exports = _.merge(defaultConfig, envConfig);