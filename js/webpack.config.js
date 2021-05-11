const path = require('path');
const webpack = require('webpack');

const ENV = 'local';

const baseConfig = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader?name=/public/[name].[ext]',
            options: {
              publicPath: '../',
            },
          },
        ],

      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      EGGY_ENV: ENV,
      NODE_ENV: 'development',
    }),
  ],
  resolve: {
    alias: {
      commons: path.resolve(__dirname, 'commons'),
    },
    extensions: ['.js', '.ts', '.tsx'],
  },
};

module.exports = baseConfig;
