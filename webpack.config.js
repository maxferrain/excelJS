// const path = require('path')
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const webpack = require('webpack')
//
// // Определение режима сборки
// const isProd = process.env.NODE_ENV === 'production'
// const isDev = !isProd
//
// // console.log(isProd)
// // console.log(isDev)
//
// // Название файлов
// const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`
//
// // Подставляем загрузчик для стилей разный для дева и прода
//
// const cssLoaders = (extra) => {
//     const loaders = [{
//         loader: MiniCssExtractPlugin.loader,
//         options: {
//             hmr: isDev,
//             reloadAll: true,
//             // publicPath: '../'
//         },
//     },
//         'css-loader',
//     ]
//
//     if (isProd) {
//         loaders.push({
//             loader: 'postcss-loader',
//             options: {
//                 sourceMap: true,
//                 config: {
//                     path: 'postcss.config.js'
//                 }
//             }
//         })
//     }
//
//     if (extra) {
//         loaders.push(extra)
//     }
//
//     return loaders
// }
//
// // Настройки сборки
//
// module.exports = {
//     context: path.resolve(__dirname, 'src'),
//     mode: "development",
//     entry: ['@babel/polyfill','./index.js', 'webpack/hot/only-dev-server'],
//     output: {
//         filename: filename('js'),
//         path: path.resolve(__dirname, 'dist')
//     },
//     resolve: {
//         extensions: ['.js'],
//         alias: {
//             '@': path.resolve(__dirname, 'src'),
//             '@core': path.resolve(__dirname, 'src/core')
//         }
//     },
//     devtool: isDev ? 'source-map' : false,
//     devServer: {
//         port: 3000,
//         hot: isDev
//     },
//     plugins: [
//         new CleanWebpackPlugin(),
//         new HtmlWebpackPlugin({
//             template: "index.html",
//             minify: {
//                 removeComments: isProd,
//                 collapseWhitespace: isProd
//             }
//         }),
//         new CopyPlugin({
//             patterns: [{
//                 from: path.resolve(__dirname, 'src/favicon.ico'),
//                 to: path.resolve(__dirname, 'dist')
//             }]
//         }),
//         new MiniCssExtractPlugin({
//             filename: filename('css')
//         }),
//         // new webpack.HotModuleReplacementPlugin({
//         //     // Options...
//         // })
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.s[ac]ss$/i,
//                 // use: [
//                 //     {
//                 //         loader: MiniCssExtractPlugin.loader,
//                 //         options: {
//                 //             hmr: isDev,
//                 //             reloadAll: true
//                 //         }
//                 //     },
//                 //     'css-loader', // css to commonJS
//                 //     'sass-loader' //sass to css
//                 // ]
//                 use: cssLoaders('sass-loader')
//
//                 // use: [
//                 //     MiniCssExtractPlugin.loader,
//                 //     'css-loader', // css to commonJS
//                 //     'sass-loader' //sass to css
//                 // ]
//             },
//             {
//                 test: /\.js$/,
//                 exclude: /node_modules/,
//                 loader: "babel-loader",
//                 options: {
//                     presets: ['@babel/preset-env']
//                 }
//             }
//         ]
//     }
// }

const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const webpack = require('webpack')

// Определение режима сборки
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

// console.log(isProd)
// console.log(isDev)

// Название файлов
const filename = (ext) => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

// Подставляем загрузчик для стилей разный для дева и прода

// const cssLoaders = (extra) => {
//     const loaders = [{
//         loader: MiniCssExtractPlugin.loader,
//         options: {
//             // hmr: isDev,
//             // reloadAll: true,
//             // publicPath: '../'
//         },
//     },
//         'css-loader',
//     ]
//
//     if (isProd) {
//         loaders.push({
//             loader: 'postcss-loader',
//             options: {
//                 sourceMap: true,
//                 config: {
//                     path: 'postcss.config.js'
//                 }
//             }
//         })
//     }
//
//     if (extra) {
//         loaders.push(extra)
//     }
//
//     return loaders
// }

const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }
    ]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}


// Настройки сборки

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        // contentBase: './dist',
        port: 3000,
        hot: isDev,
        static: true
    },
    // target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
    target: 'web',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'Hot Module Replacement',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        // new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // hmr: isDev,
                            // reloadAll: true
                        }
                    },
                    'css-loader', // css to commonJS
                    'sass-loader' // sass to css
                ]
                // use: cssLoaders('sass-loader')

                // use: [
                //     MiniCssExtractPlugin.loader,
                //     'css-loader', // css to commonJS
                //     'sass-loader' //sass to css
                // ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            }
        ]
    }
}
