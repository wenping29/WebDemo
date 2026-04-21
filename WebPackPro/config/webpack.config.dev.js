const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'scripts/index.js',
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    // middle
    static: {
      directory: path.join(__dirname, '../dist/'),
    },
    port: '8089',
    // host: 'localhost',
    compress: true,
    // headers: {
    //   "W-Access-token": '12313123123123123'
    // },
    proxy: {
      '/api': {
        target: 'http://localhost:9000/api', // API服务器的地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    client: {
      reconnect: true,
      progress: true,
      logging: 'verbose',
      overlay: {
        errors: false,
        warnings: false,
      },
    },
  },
  plugins: [
    new ESLintPlugin(),
  ],
  optimization: {
    usedExports: true,
  },
};
