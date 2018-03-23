const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const configure = {
    entry: path.resolve(__dirname, "src/app.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        publicPath: "./dist"
    },
    devtool: "source-map", 
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: false,
                                sourceMap: false
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: false
                            }
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.(jpg|png|gif)/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }
            }
        ]
    },
    plugins: [
        // new ExtractTextPlugin("styles.css")
        new ExtractTextPlugin("css/[name].css"),
        new UglifyJsPlugin({
            include: /\.js$/,
        })
    ],
}

module.exports = configure;

