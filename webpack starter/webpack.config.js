const path = require('path');
const production = process.env.NODE_ENV === "production";
var OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require("autoprefixer");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: !production,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    entry: './_assets/index.js',
    output: {
        path: path.resolve(__dirname, 'scripts'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s(a|c)ss$/,
                exclude: /\.module.(s(a|c)ss)$/,
                loader: [
                    {
                        loader: 'babel-loader'
                    },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer()]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    optimization: {
        minimizer: !production == true ? [] : [
            new OptimizeCSSAssetsPlugin({ cssProcessorOptions: { map: { inline: false, annotation: true, } } }),
            new UglifyJSPlugin()
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css'
        }),
        require('autoprefixer')
    ],
};

