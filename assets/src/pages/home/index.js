/**!
 * 执行渲染的容器组件
 * clientRender entry for home page
 *
 * Authors:
 *   怿航 <xiangzhong.wxz@alibaba-inc.com>
 */

'use strict';import React, {Component} from 'react';

import Draggable from 'react-draggable';
import ReactDOM from 'react-dom';

import './index.scss';

class App extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            activeDrags: 0, // 当前被拖拽模块的数量
            deltaPosition: {
                x: 0,
                y: 0
            },
            controlledPosition: {
                x: -400,
                y: 200
            }
        };
    }

    handleDrag(e, ui) {
        console.log(e);
        const {x, y} = this.state.deltaPosition;

        this.setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY
            }
        });
    }

    onStart(e) {
        e.target.style.zIndex = 999;

        if(e.target.style.position === 'static' || !e.target.style.position) {
            e.target.style.position = 'relative';
        }

        this.setState({
            activeDrags: ++this.state.activeDrags
        });
    }

    onStop(e) {
        e && e.target && (e.target.style.zIndex = 1);

        this.setState({
            activeDrags: --this.state.activeDrags
        });
    }

    // For controlled component
    adjustXPos(e) {
        e.preventDefault();
        e.stopPropagation();

        const {x, y} = this.state.controlledPosition;

        this.setState({
            controlledPosition: {
                x: x - 10,
                y
            }
        });
    }

    adjustYPos(e) {
        e.preventDefault();
        e.stopPropagation();
        const {controlledPosition} = this.state;
        const {x, y} = controlledPosition;
        this.setState({
            controlledPosition: {
                x,
                y: y - 10
            }
        });
    }

    onControlledDrag(e, position) {
        const {x, y} = position;
        this.setState({
            controlledPosition: {
                x,
                y
            }
        });
    }

    onControlledDragStop(e, position) {
        this.onControlledDrag(e, position);
        this.onStop();
    }

    render() {
        const dragHandlers = {
            onStart: ::this.onStart,
            onDrag: ::this.onDrag,
            onStop: ::this.onStop
        };
        const {deltaPosition, controlledPosition} = this.state;
        return (
            <div>
                <h1>React Draggable</h1>
                <p>Active DragHandlers: {this.state.activeDrags}</p>
                <p>
                    <a
                        href="https://github.com/mzabriskie/react-draggable/blob/master/example/index.html">Demo Source</a>
                </p>

                <Draggable
                  {...dragHandlers}
                >
                    <div
                      className="box"
                    >I can be dragged anywhere</div>
                </Draggable>

                <Draggable axis="x" {...dragHandlers}>
                    <div className="box cursor-x">I can only be dragged horizonally (x axis)</div>
                </Draggable>

                <Draggable axis="y" {...dragHandlers}>
                    <div className="box cursor-y">I can only be dragged vertically (y axis)</div>
                </Draggable>

                <Draggable onStart={() => false}>
                    <div className="box">I don not want to be dragged</div>
                </Draggable>

                <Draggable onDrag={::this.handleDrag} {...dragHandlers}>
                    <div className="box">
                        <div>I track my deltas</div>
                        <div>x: {deltaPosition
                                .x
                                .toFixed(0)}, y: {deltaPosition
                                .y
                                .toFixed(0)
                            }
                        </div>
                    </div>
                </Draggable>

                <Draggable handle="strong" {...dragHandlers}>
                    <div className="box no-cursor">
                        <strong className="cursor">
                            <div>Drag here</div>
                        </strong>
                        <div>You must click my handle to drag me</div>
                    </div>
                </Draggable>

                <Draggable cancel="strong" {...dragHandlers}>
                    <div className="box">
                        <strong className="no-cursor">Can not drag here</strong>
                        <div>Dragging here works</div>
                    </div>
                </Draggable>

                <Draggable grid={[25, 25]} {...dragHandlers}>
                    <div className="box">I snap to a 25 x 25 grid</div>
                </Draggable>

                <Draggable grid={[50, 50]} {...dragHandlers}>
                    <div className="box">I snap to a 50 x 50 grid</div>
                </Draggable>

                <Draggable
                    bounds={{
                        top: -100,
                        left: -100,
                        right: 100,
                        bottom: 100
                    }}
                    {...dragHandlers}>
                    <div className="box">I can only be moved 100px in any direction.</div>
                </Draggable>

                <div
                    className="box"
                    style={{
                    height: '500px',
                    width: '500px',
                    position: 'relative',
                    overflow: 'auto',
                    padding: '0'
                }}>
                    <div
                        style={{
                            height: '1000px',
                            width: '1000px',
                            padding: '10px'
                        }}
                    >
                        <Draggable bounds="parent" {...dragHandlers}>
                            <div className="box">
                                I can only be moved within my offsetParent.<br/><br/>
                                Both parent padding and child margin work properly.
                            </div>
                        </Draggable>
                        <Draggable bounds="parent" {...dragHandlers}>
                            <div className="box">
                                I also can only be moved within my offsetParent.<br/><br/>
                                Both parent padding and child margin work properly.
                            </div>
                        </Draggable>
                    </div>
                </div>
                <Draggable bounds="body" {...dragHandlers}>
                    <div className="box">
                        I can only be moved within the confines of the body element.
                    </div>
                </Draggable>

                <Draggable>
                    <div
                        className="box"
                        style={{
                            position: 'absolute',
                            bottom: '100px',
                            right: '100px'
                        }}
                        {...dragHandlers}>
                        I already have an absolute position.
                    </div>
                </Draggable>

                <Draggable
                    defaultPosition={{
                        x: 25,
                        y: 25
                    }}
                    {...dragHandlers}>
                    <div className="box">
                        {"I have a default position of {x: 25, y: 25}, so I'm slightly offset."}
                    </div>
                </Draggable>

                <Draggable
                    position={controlledPosition}
                    {...dragHandlers}
                    onDrag={::this.onControlledDrag}>
                    <div className="box">
                        My position can be changed programmatically.
                        <br/>
                        I have a drag handler to sync state.
                        <p>
                            <a href="#" onClick={this.adjustXPos}>Adjust x ({controlledPosition.x})</a>
                        </p>
                        <p>
                            <a href="#" onClick={this.adjustYPos}>Adjust y ({controlledPosition.y})</a>
                        </p>
                    </div>
                </Draggable>

                <Draggable
                    position={controlledPosition}
                    {...dragHandlers}
                    onStop={::this.onControlledDragStop}>
                    <div className="box">
                        My position can be changed programmatically.
                        <br/>
                        I have a dragStop handler to sync state.
                        <p>
                            <a href="#" onClick={this.adjustXPos}>Adjust x ({controlledPosition.x})</a>
                        </p>
                        <p>
                            <a href="#" onClick={this.adjustYPos}>Adjust y ({controlledPosition.y})</a>
                        </p>
                    </div>
                </Draggable>
            </div>
        );
    }

    onDrag(e, ui) {
        let target = e.target;

        let curRect = {
            target,
            rect: this.getRect(target.getBoundingClientRect())
        };

        const coverAry = this._posAry.filter(item => {
            return item.target !== target && this.judgeCover(item.rect, curRect.rect);
        });

        const maxCover = this.getMaxCover(curRect, coverAry);

        console.log('maxCover:', maxCover);
    }

    // 获取当前覆盖度最大的一个元素
    getMaxCover(curPos, rectAry) {
        if(!rectAry.length) {
            return null;
        }

        if(rectAry.length === 1) {
            return {
                ...rectAry[0],
                pos: this.getRelativePos(curPos, rectAry[0])
            };
        }

        let maxItem;
        let maxArea = 0;

        let curRect = curPos.rect;

        rectAry.forEach(item => {
            let rect = item.rect;
            let curArea = (rect.top < curRect.top ? (rect.top + rect.height - curRect.top) : (curRect.top + curRect.height - rect.top))
                * (rect.left < curRect.left ? (rect.left + rect.eidth - curRect.left) : (curRect.left + curRect.width - rect.left));

            if(curArea > maxArea) {
                maxArea = curArea;

                maxItem = {
                    ...item,
                    pos: this.getRelativePos(curPos, item)
                };
            }
        });

        return maxItem;
    }

    // 获取相对于当前重叠元素的位置
    getRelativePos(item1, item2) {
        let rect1 = item1.rect;
        let rect2 = item2.rect;

        let pos = '';

        if(Math.abs(rect1.top - rect2.top) > Math.abs(rect1.left - rect2.left)) {
            if(rect1.top <= (rect2.top + rect2.height / 2) ) {
                pos = 'up';
            } else {
                pos = 'down';
            }
        } else {
            if(rect1.left <= (rect2.left + rect2.width / 2)) {
                pos = 'left';
            } else {
                pos = 'right';
            }
        }

        return pos;
    }

    // 判断是否有覆盖
    judgeCover(pos1, pos2) {
        return Math.abs(pos1.top - pos2.top) <= Math.min(pos1.height, pos2.height)
          && Math.abs(pos1.left - pos2.left) <= Math.min(pos1.width, pos2.width);
    }

    // 获取真正的boundingClientRect
    getRect(rect) {
        let bound = {};

        for(let pro in rect) {
            bound[pro] = rect[pro];
        }

        bound.top += document.body.scrollTop;
        bound.left += document.body.scrollLeft;

        return bound;
    }

    componentDidMount() {
        const domList = [].slice.call(document.querySelectorAll('.react-draggable'));

        this._posAry = domList.map(item => {
            let rect = item.getBoundingClientRect();

            return {
                target: item,
                rect: this.getRect(rect)
            };
        });
    }
}

ReactDOM.render(<App/>, document.getElementById('container'));
