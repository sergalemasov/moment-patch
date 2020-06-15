const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        main: './main',
        oldMain: './old-main'
    },

    context: path.join(__dirname, 'src'),

    output: {
        path: path.join(__dirname, 'built'),
        filename: '[name].js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader' // https://github.com/TypeStrong/ts-loader
        }]
    },

    plugins: [
        // https://webpack.js.org/plugins/provide-plugin/
        new webpack.ProvidePlugin({
            moment: path.resolve(path.join(__dirname, 'src/patch/moment.patch'))
        }),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],

    optimization: {
        // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    minChunks: 2
                }
            }
        }
    },

    devtool: 'none',

    // https://github.com/webpack/webpack-dev-server
    devServer: {
        port: '4200',
        open: true
    }
}