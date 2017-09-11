'use strict';

module.exports = app => {
    app.get('/home', app.controller.home);

    // 默认导航到home页面
    app.redirect('/', '/home');
};
