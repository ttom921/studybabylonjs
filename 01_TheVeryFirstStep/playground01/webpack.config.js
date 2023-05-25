//引入一個包
const path = require('path');
const fs = require("fs");
//引入html插件
const HtmlWebpackPlugin = require('html-webpack-plugin');

//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const CopyPlugin = require("copy-webpack-plugin");
// 載入 mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const appDirectory = fs.realpathSync(process.cwd());

// webpack 中的所有的配置信息都應該寫在module.exports中
module.exports = {
    mode: "development",
    //指定入口文件
    entry: path.resolve(appDirectory, "src/app.ts"),
    //指定打包文件所在目錄
    output: {
        //指定打包文件的目錄
        path: path.resolve(appDirectory, "dist"),
        //打包後的文件的文件
        filename: "bundle.js",
        //publicPath: 'auto',
        // //告訴webpack不使用箭頭函式
        // environment:{
        //     arrowFunction:false;
        // }
        clean: true,
        //assetModuleFilename: 'img/[name][ext]',
    },
    //用來設罝引用模塊
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080, //port that we're using for local host (localhost:8080)
        static: path.resolve(appDirectory, "public"), //tells webpack to serve from the public folder
        // publicPath: '/',
        hot: true,
        // devMiddleware: {
        //     publicPath: "/",
        // }
    },
    //指定webpack打包時要使用模塊
    module: {
        //指定要加載的規則
        rules: [
            {
                //test 指定的是規則生效的文件
                test: /\.tsx?$/,
                //要使用的loader
                use: [
                    //配置babel
                    {
                        //指定加載器
                        loader: "babel-loader",
                        //設定babel
                        options: {
                            //設置預定定義的環境
                            presets: [
                                [
                                    //指定環境的插件
                                    "@babel/preset-env",
                                ]
                            ]
                        }
                    },
                    "ts-loader",
                ],
                //要排除的文件
                exclude: /node_modules/,
            },

            //處理css
            {
                test: /\.css$/i,
                // 新增 loader 
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../', // 指定公共路徑
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        }
                    }
                ],
            },
            //將webpack的asset不動作
            {
                test: /\.(eot|gif|otf|png|svg|ttf|woff)?$/,
                type: 'asset/resource',
                generator: {
                    emit: false
                },
            },
        ],

    },
    //配罝Webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            //title:"這是一個自定義的title",
            inject: true,
            template: path.resolve(appDirectory, "public/index.html"),
        }),
        //css
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
        }),
        //處理資源
        new CopyPlugin({
            patterns: [
                {
                    from: "public",
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: [
                            "**/index.html",
                            '**/css/*.css',
                        ],
                    },
                },
            ]
        }),
    ],
}