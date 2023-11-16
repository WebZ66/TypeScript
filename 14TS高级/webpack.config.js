const path = require('path')
const { Configuration } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const webpack = require('webpack')

const glob = require('glob')
/**
 * @type {Configuration} //配置智能提示
 */

const getWebpackConfig = (isProd) => {
    return {
        mode: 'development',
        entry: './src/main.ts',
        output: {
            filename: 'js/[name]_bundle.js',
            chunkFilename: 'js/[name]_chunk.js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
            extensions: ['.js', '.ts'],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
                {
                    test: /\.ts$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-typescript',
                                    {
                                        corejs: 3,
                                        useBuiltIns: 'usage',
                                    },
                                ],
                            ],
                        },
                    },
                },
                {
                    test: /\.css$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
            ],
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'css/[name]_css.css',
                //对于动态导入的css文件进行命名，并放到对应文件夹中import('./xx.css')
                chunkFilename: 'css/[name]_chunk.css',
            }),
            new CssMinimizerPlugin(),
            new HtmlWebpackPlugin({
                template: './index.html',
                minify: isProd
                    ? {
                          //自定义压缩,移除注释
                          removeComments: true,
                          //移除空属性
                          removeEmptyAttributes: true,
                          //移除多余属性
                          removeRedundantAttributes: true,
                          //折叠空白字符
                          collapseWhitespace: true,
                      }
                    : false,
            }),
            new PurgeCSSPlugin({
                //递归查找src下的所有文件  glob.sync是node内置模块，可以查找文件路径
                paths: glob.sync(`${path.resolve(__dirname, './src/**/*')}`, { nodir: true }),
                //白名单，哪些不要删除
                safelist: function () {
                    return {
                        standard: ['body'],
                    }
                },
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new FriendlyErrorsWebpackPlugin({
                compilationSuccessInfo: {
                    messages: [`Your project is running here: http}://`],
                },

                clearConsole: true,
            }),
        ],
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devServer: {
            port: 8080,
            hot: true,
        },
    }
}

module.exports = function (env) {
    const isProd = env.production ? true : false
    return getWebpackConfig(isProd)
}
