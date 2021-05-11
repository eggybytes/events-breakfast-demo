const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const baseConfig = require('../webpack.config');

const getAssetsPath = () => path.join(process.cwd(), 'dist');
const getPublicPath = () => `/dist/`;

const nodeModules = {};
fs.readdirSync('../node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const clientConfig = {
  ...baseConfig,
  name: 'client',
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, '/src'),
  output: {
    path: path.resolve(getAssetsPath(), 'static'),
    publicPath: getPublicPath(),
    filename: 'breakfast-webapp.bundle.js',
  },
};

const serverConfig = {
  ...baseConfig,
  name: 'server',
  target: 'node',
  entry: path.join(__dirname, '/server'),
  output: {
    path: getAssetsPath(),
    filename: 'server.js',
    libraryTarget: 'commonjs2',
  },
  externals: nodeModules,
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/\.css$/, 'node-noop'),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: 'public' },
      ],
    }),
  ],
};

exports.clientConfig = clientConfig;
exports.serverConfig = serverConfig;
exports.default = [clientConfig, serverConfig];
