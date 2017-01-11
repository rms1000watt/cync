'use strict';

module.exports = {
  entry: {
    app: './example/index.js',
  },
  output: {
    path: './',
    filename: 'bundle.js',
    publicPath: '/',
  },
  debug: true,
  devtool: 'eval',
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, loader: 'babel', exclude:[/node_modules/] },
    ],
  },
  externals: {
    react: 'React',
    immutable: 'Immutable',
  },
  resolve: {
    alias: {
      cync: '../src/index.js',
    },
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    contentBase: 'example',
    publicPath: '/',
    stats: { colors: true },
    host: '0.0.0.0',
    inline: true,
    port: '8090',
    quiet: false,
    noInfo: false,
  },
};
