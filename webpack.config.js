const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = [
  {
    entry: {
      game: __dirname + '/src/game'
    },
    output: {
      filename: '[name].bundle.js',
      path: __dirname + '/public/dist'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
        { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
      ]
    }
  },
  {
    entry: {
      main: __dirname + '/public/stylesheets/main.scss'
    },
    output: {
      filename: '[name].css',
      path: __dirname + '/public/dist'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: extractSass.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: { importLoaders: 1 } },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [require('autoprefixer')]
                }
              },
              { loader: 'sass-loader' }
            ]
          })
        },
        {
          test: /\.(png|jpg)$/,
          use: [{ loader: 'url-loader' }]
        }
      ]
    },
    plugins: [extractSass]
  }
];
