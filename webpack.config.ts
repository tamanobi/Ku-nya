import webpack = require('webpack')
import path = require('path')

export default (env, argv) =>
  ({
    context: path.join(__dirname, 'src'),
    entry: {
      main: './main.ts',
      popup: './popup.ts',
    },
    output: {
      path: path.join(__dirname, 'release/dist'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: ['node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    optimization: {
      minimize: argv.mode === 'production',
    },
  } as webpack.Configuration)
