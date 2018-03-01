const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const configure = {
    entry: path.resolve(__dirname, "src/app.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/[name].js",
        publicPath: "./dist",
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
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
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
            }
        ]
    },
    plugins: [
        // new ExtractTextPlugin("styles.css")
        new ExtractTextPlugin("css/[name].css")
    ]
}

module.exports = configure;

