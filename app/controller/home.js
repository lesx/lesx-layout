'use strict';

require('babel-register');

const colors = require('colors');

console.log('Home controller'.red);

module.exports = function* homeController() {
    console.log('this.params:'.blue, this.params);

    const mydata = {
        username: 'xiangzhong.wxz'
    };

    yield this.render('Home.js', {
        mydata: {
            userdata: {},
        }
    });
};
