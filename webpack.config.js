const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    sourceMapFilename: 'main.js.map',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
};
