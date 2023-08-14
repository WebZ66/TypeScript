//配置webpack智能提示
const { Configuration } = require('webpack')
/**
 * @type {Configuration} //配置智能提示
 */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        clean: true
    },
    resolve: {
        extensions: ['.js', '.json', '.vue', '.jsx', '.tsx', '.ts'],
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    module: {
        rules: [{ test: /\.ts/, use: ['ts-loader'] }]
    },
    plugins: [new HtmlWebpackPlugin({ template: './dist/index.html' })],
    devServer: {
        hot: true,
        port: 9000,
        open: true,
        compress: true
    }
}
