const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './client/main.js', // 入口文件
    output: {
        filename: 'bundle.js', // 输出文件的名称
        path: path.resolve(__dirname, '../client'), // 输出的目录
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 使用正则表达式匹配所有的 JavaScript 文件
                exclude: /node_modules/, // 排除 node_modules 目录
                use: {
                    loader: 'babel-loader', // 使用 babel-loader 处理 JavaScript 文件
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js'],
    },
    mode: 'production', // 切换到 production 模式
    optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                arguments: true,
                dead_code: true,
              },
              mangle: {
                toplevel: true,
                keep_classnames: true,
                keep_fnames: true,
              },
            },
          }),
        ],
      },
};