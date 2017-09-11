/**!
 * exh-node - app/views/layout/Default.js
 * default layout
 *
 * Authors:
 *   怿航 <xiangzhong.wxz@alibaba-inc.com>
 */
'use strict';

import React, { Component, PropTypes } from 'react';

// 静态文件引用路径配置
let microdata = {
    styleDomain: "/public",
    styleVersion: ''
};

class Default extends Component {
    static propTypes = {
        children: PropTypes.object,
        title: PropTypes.string,
        scriptUrls: PropTypes.array
    };

    renderScripts() {
        const {scriptUrls} = this.props;
        let items = [];

        scriptUrls && scriptUrls.map((url, i)=>{
            items.push(<script key={i} src={`${microdata.styleDomain}/${url}`} />);
        });

        return items;
    }

    renderStyle() {
        const {styleUrls} = this.props;
        let items = [];

        styleUrls && styleUrls.map((url, i) => {
            items.push(<link rel="stylesheet" type="text/css" href={`${microdata.styleDomain}/${url}`} />);
        })

        return items;
    }

    render() {
        const { title, children } = this.props;

        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
                    <meta httpEquiv='Cache-Control' content='no-siteapp' />
                    <meta name='renderer' content='webkit' />
                    <meta name='keywords' content='seek' />
                    <meta name='description' content='企业级应用文档平台' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    {this.renderStyle()}
                    <title>{title}</title>
                </head>
                <body>
                    {children}
                    {this.renderScripts()}
                </body>
            </html>
        );
    }
};

module.exports = Default;
