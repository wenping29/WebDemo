const { merge } = require('webpack-merge');
const prodConfig = require('./webpack.config.prod');
const baseConfig = require('./webpack.config.base');
const devConfig = require('./webpack.config.dev');

module.exports = env => {
  console.log(env, 'envvvvvvvvvvvvv');
  switch (true) {
    case env.production:
      return merge(baseConfig, prodConfig);
      // break;
    case env.development:
      return merge(baseConfig, devConfig);
      // break;
    default:
      return merge(baseConfig, devConfig);
      // break;
  }
};
