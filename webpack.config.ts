import webpack = require('webpack')
import path = require('path')

export default (env, argv) =>
  ({
    context: path.join(__dirname, 'src'),
    entry: {
      "dist/main": './main.tsx',
      "dist/popup": './popup.tsx',
      "background": './background.tsx',
      "sw": './sw.js',
    },
    output: {
      path: path.join(__dirname, 'release'),
      filename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
      modules: ['node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
    optimization: {
      minimize: argv.mode === 'production',
    },
    plugins: [
      new webpack.DefinePlugin({
        SENTRY_DSN: JSON.stringify(process.env.SENTRY_DSN || null),
      }),
    ],
  } as webpack.Configuration)
