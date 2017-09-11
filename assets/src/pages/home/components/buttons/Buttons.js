'use strict';

import React, {Component} from 'react';

import './buttons.scss';

export default () => {
    return (
        <div className='doc-buttons'>
            <a className="button button-ghost color-default large" href="#quick-start">
                了解更多 <i className="fa fa-arrow-right"></i>
            </a>
        </div>
    );
}
