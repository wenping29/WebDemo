const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Minicssextractplugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist/'),
    clean: true,
  },
  cache: {
    type: 'filesystem',
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      inject: 'body',
      publicPath: 'http://localhost:8089/',
    }),
    new Minicssextractplugin({
      filename: 'style/[contenthash].css',
    }),
    new CssMinimizerWebpackPlugin(),
  ],
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   exclude: /node_modules/,
      //   use: 'ts-loader',
      //   // exclude: /node_modules/,
      //   // options: {
      //   //   appendTsSuffixTo: [/\.vue$/],
      //   // },
      // },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
        {
          loader: 'thread-loader',
          options: {
            workers: 2,
          },
        },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.jpg$|\.png$|\.svg$/,
        // test:/\.png$/,
        type: 'asset',
        generator: {
          filename: 'asset/images/[contenthash].[ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024,
          },
        },
      },
      {
        test: /\.(css|less)$/,
        // use: ['style-loader', 'css-loader', 'less-loader']
        use: [Minicssextractplugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(woff|ttf)$/,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      new CssMinimizerWebpackPlugin()],
  },
  performance: {
    maxEntrypointSize: 50000000,
    maxAssetSize: 30000000,
    assetFilter: assetFilename => assetFilename.endsWith('.css') || assetFilename.endsWith('.js'),
    hints: 'warning',
  },
};
