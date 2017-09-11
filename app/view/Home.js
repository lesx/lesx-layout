/**!
 * exh-node - app/views/Home.js
 * page of home
 */

'use strict';

import path from 'path';
import React, { Component, PropTypes } from 'react';
import Default from './layout/Default';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let scriptUrls = [`common.js`, `home.js`];
        let styleUrls = [`home.css`];

        return (
            <Default
                scriptUrls={scriptUrls}
                styleUrls={styleUrls}
                title={"可视化运营平台"}
            >
                <div
                    id="container"
                    className="container"
                >
                </div>
            </Default>
        );
    }
};

module.exports = Home;
