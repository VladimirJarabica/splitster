module.exports = {
  entry: './src/client.js',
  output: {
    filename: 'bundle.js',
    path: 'lib/dist',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
}
