const path = require('path');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode: mode,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index-umd.js',
    library: {
      name: 'srec',
      type: 'umd',
    },
  },

  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    watchContentBase: true,
    // hot: true,
  },
};
