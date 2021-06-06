// Webpack Plugins
const CopyPlugin = require('copy-webpack-plugin');

// Node
const path = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index-umd.js',
    library: {
      name: 'srec',
      type: 'umd',
    },
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public/', to: './' }],
    }),
  ],

  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    // hot: true,
  },
};
