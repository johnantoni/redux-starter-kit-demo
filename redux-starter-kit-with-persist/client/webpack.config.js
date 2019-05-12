const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production';

const BUILD_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

const isHot = path.basename(require.main.filename) === 'webpack-dev-server.js';

console.log(isHot)

console.log('BUILD_DIR', BUILD_DIR);
console.log('SRC_DIR', SRC_DIR);

const cssPlugin = new MiniCssExtractPlugin({
  filename: "style.css"
});

const htmlPlugin = new HtmlWebpackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});

const copyWebpack = new CopyWebpackPlugin([
    {from: './node_modules/font-awesome/fonts', to: 'fonts'},
    {from: './public/favicon.ico' },
    {from: './public/robots.txt' }
  ],
  {copyUnmodified: false}
);

const uglifyJs = new UglifyJsPlugin({
  parallel: 4
});

module.exports = {
    target: 'web',
    entry: {
      index: [SRC_DIR + '/index.js']
    },
    output: {
      publicPath: '/',
      path: BUILD_DIR,
      filename: '[name].bundle.js'
    },
    devtool: 'source-map',
    devServer: {
      port: 3000,
      disableHostCheck: true,
      host: 'localhost',
      contentBase: BUILD_DIR,
      historyApiFallback: true,
      compress: true,
      hot: true,
      open: true,
      proxy: {
        '/p1/*': 'http://localhost:5000',
        '/public/*': 'http://localhost:5000'
      }
    },
    module : {
        rules : [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    isHot ? "style-loader" : MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            }
        ]
    },
    plugins: this.mode === 'production'
     ? [cssPlugin, htmlPlugin, copyWebpack, uglifyJs]
     : [cssPlugin, htmlPlugin, copyWebpack]
    ,
    mode : devMode ? 'development' : 'production'
};
