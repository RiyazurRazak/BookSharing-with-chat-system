const path = require("path")
const webpackNodeExternals = require("webpack-node-externals")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")





module.exports = {
   
    target: "node",
    entry: ['regenerator-runtime/runtime',"./server.js"],
    devtool:"source-map",
    output:{
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/build"
    },
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
            options: {
              publicPath: 'public/',
            },
          },
          'css-loader',] 
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                loader: 'file-loader',
                options: {
                outputPath: "public/assets",
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
    externals:[webpackNodeExternals()]
  
}