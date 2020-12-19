const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")






module.exports = {

    target: "node",
    entry: ['regenerator-runtime/runtime',"./src/index.js"],
    devtool:"source-map",
    output:{
        filename: "client_bundle.js",
        path: path.resolve(__dirname, "build/public"),
        publicPath: "/build/public"
    },
    plugins: [
        new MiniCssExtractPlugin({
          filename: 'client_bundle.css',
          chunkFilename: '[id].[contenthash].css',
          linkType: 'text/css',
        }),
        new webpack.DefinePlugin({
            "process.env": {
              IS_BROWSER: "true"
            }
          })
      ],
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude:"/node_modules/",
                options:{
                    presets:[
                        "@babel/react",
                        ["@babel/env",{
                            targets:{browsers :["last 2 versions"]}
                        }]
                    ],
                }
            },
            {
                test: /\.css?$/,
                use:[{
                    loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',] 
            },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    loader: 'file-loader',
                    options: {
                    outputPath: "/assets",
                    publicPath: '../assets/',
                    },
                  },
                 
               
            ]
    },
    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin({
              cache:true,
          }),
        ],
      },
}