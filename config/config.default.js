'use strict';

const path = require('path');
const fs = require('fs');

module.exports = appInfo => {
    const config = {};

    // should change to your own
    config.keys = appInfo.name + '_1505132241320_6888';

    // 静态文件配置
    config.static = {
        router: '/public',
        dir: path.join(appInfo.baseDir, './assets/build')
    };

    const viewpath = path.join(__dirname, '../app/view');

    config.view = {
        extname: 'js', // 选填，文件后缀
        beautify: true, // 选填，是否格式化 HTML
        cache: false, // 选填，是否开启缓存，默认为false
        cacheOptions: {

        }, // 选填，缓存配置，参照(https://github.com/isaacs/node-lru-cache#options)， 默认配置参照(https://github.com/isaacs/node-lru-cache#usage)
        loadpath: viewpath, // 选填，View 本地文件路径
        internals: false, // 选填，选择 renderToString 或 renderToStaticMarkup
        doctype: '<!DOCTYPE html>' // 选填，DOC 头
    };

    // add your config here

    return config;
};
