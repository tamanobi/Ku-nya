import { Configuration } from 'webpack'
import { join } from 'path'

module.exports = {
    context: join(__dirname, 'src'),
    entry: {
        main: './main.ts',
        popup: './popup.ts'
    },
    output: {
        path: join(__dirname, 'release/dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            { loader: 'ts-loader', test: /\.ts$/ }
        ]
    }
} as Configuration
