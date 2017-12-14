const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ENV = process.env.NODE_ENV;
const debug = ENV !== "production";

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: {
        main: [
            './app.js',
            './scss/main.scss'
        ],
        login: './scss/login.scss',
        style3: './scss/style3.scss',
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'

    },

    devtool: debug ? 'source-map' : false,

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                query: {
                    presets: ['es2015']
                }
            },

            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: 'file-loader?name=/img/[name].[ext]'
            },

            {
                test: /\.(css|scss)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true || { /* CSSNano Options */ }
                            }
                        },
                        {
                            loader: 'sass-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            }

        ],
    },

    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(ENV === 'production'),
            DEVELOPMENT: JSON.stringify(ENV === 'development')
        }),
        new ExtractTextPlugin('[name].css')
    ],

    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        publicPath: '/dist',
    }
};
