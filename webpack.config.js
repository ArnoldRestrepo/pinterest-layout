const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const configure = {
    entry: {
        "bundle": path.resolve(__dirname, "src/app.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        publicPath: "./dist",
    },
    devServer:{
        contentBase: path.join(__dirname, "dist"),
        open: true,
        compress: true,
        port: 8080,
    },
    watch: true,
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
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
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
                        presets: ['es2015','es2016','es2017']
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
    ]
}

module.exports = configure;

