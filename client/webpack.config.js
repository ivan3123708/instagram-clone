const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const styles = new ExtractTextPlugin('styles.css');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public', 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['transform-class-properties', 'transform-object-rest-spread'],
          },
        },
      },
      {
        test: /index.sass/,
        use: styles.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    styles,
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/dist',
    historyApiFallback: true,
    proxy: [{
      context: ['/auth/*', '/api/*'],
      target: 'http://localhost:5000',
    }],
  },
};
