const HtmlWebpackPlugin = require('html-webpack-plugin');

require('webpack');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {

    entry: {
        main: './src/index.ts',
        /* about: './src/about/index.ts',*/
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 63342,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: { injectType: 'singletonStyleTag' },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                type: 'javascript/auto',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'product-images/',
                            publicPath: 'product-images/'
                        }
                    }
                ]
            }

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html'}),
        // new HtmlWebpackPlugin({filename: './src/about.html'}),
        new CopyPlugin({
            patterns: [
                { from: "./src/product-images", to:"product-images" },
                { from: "./src/*.json", to:"[name][ext]" },
                /*{ from: './src/about.html', to: 'about.html' },*/
                { from: "./src/pages/about", to:"pages/about" },
            ],
        }),
    ],
    resolve: {
        extensions: [ ".tsx", ".ts", ".js" ]
    },
};