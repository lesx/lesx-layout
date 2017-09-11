var path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(webpackConfig) {
    webpackConfig.entry = {
        home: './src/pages/home/index.js'
    };
    webpackConfig.output.path = path.join(__dirname, './build');
    webpackConfig.output.filename = '[name].js';
    // 每个页面对应的主js的生成配置
    webpackConfig.output.chunkFilename = '[id].chunk.js';

    webpackConfig.module.loaders.push({
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract('css!sass')
    }, {
        test: /\.as$/,
        loader: 'babel!@alife/fe-loader'
    });

    return webpackConfig;
};
