import PropTypes from 'prop-types';
import React, {Fragment, PureComponent} from 'react';

const defaultBorderColor = '#f00';
const defaultBorderStyle = 'solid';
const defaultBorderWidth = 1;

const optionalStyleProps = {
    borderColor: PropTypes.string,
    borderStyle: PropTypes.string,
    borderWidth: PropTypes.number,
    className: PropTypes.string,
    zIndex: PropTypes.number,
};

export class Line extends PureComponent {
    render() {
        const { x0, y0, x1, y1, orientation, arrow } = this.props;

        const dy = y1 - y0;
        const dx = x1 - x0;

        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const length = Math.sqrt(dx * dx + dy * dy);

        const positionStyle = {
            position: 'absolute',
            top: `${y0}px`,
            left: `${x0}px`,
            width: `${length}px`,
            zIndex: Number.isFinite(this.props.zIndex)
                ? String(this.props.zIndex)
                : '1',
            transform: `rotate(${angle}deg)`,
            // Rotate around (x0, y0)
            transformOrigin: '0 0',
        };

        const defaultStyle = {
            borderTopColor: this.props.borderColor || defaultBorderColor,
            borderTopStyle: this.props.borderStyle || defaultBorderStyle,
            borderTopWidth: this.props.borderWidth || defaultBorderWidth,
        };

        const props = {
            className: this.props.className,
            style: Object.assign({}, defaultStyle, positionStyle),
        }

        const arrowStyle = arrow ? {
            ...positionStyle,
            top: `${orientation === 'h' ? y0 - 8 : y0}px`,
            left: `${orientation === 'v' ? x0 - 8 : x0}px`,
            width: 0,
            height: 0,
            borderTop: '9px solid transparent',
            borderBottom: '9px solid transparent',
            borderRight: `9px solid ${defaultStyle.borderTopColor}`,
        } : {};

        // We need a wrapper element to prevent an exception when then
        // React component is removed. This is because we manually
        // move the rendered DOM element after creation.
        return (
            <div className="react-lineto-placeholder">
                <div
                    ref={(el) => { this.el = el; }}
                    {...props}
                />
                {
                    arrow ? <div style={arrowStyle}></div> : null
                }
            </div>
        );
    }
}

Line.propTypes = Object.assign({}, {
    x0: PropTypes.number.isRequired,
    y0: PropTypes.number.isRequired,
    x1: PropTypes.number.isRequired,
    y1: PropTypes.number.isRequired,
    arrow: PropTypes.boolean,
    orientation: PropTypes.oneOf(['h','v'])
}, optionalStyleProps);

export class SteppedLine extends PureComponent {
    getMin(pos0, pos1) {
        const orientation = (pos0.y < pos1.y &&  pos0.y + pos0.height > pos1.y) || (pos1.y < pos0.y &&  pos1.y + pos1.height > pos0.y) ? 'h' : 'v';
        return {
            x0: pos0.x <= pos1.x ? pos0.x + pos0.width/2 : pos1.x + pos1.width/2,
            x1: pos0.x <= pos1.x ? pos1.x + pos1.width/2 : pos0.x + pos0.width/2,
            y0: pos0.y <= pos1.y ? pos0.y + pos0.height/2 : pos1.y + pos1.height/2,
            y1: pos0.y <= pos1.y ? pos1.y + pos1.height/2 : pos0.y + pos0.height/2,
            orientation,
            x0Offset: orientation === 'h' ? (pos0.x <= pos1.x ? pos0.width / 2 : pos1.width / 2) : 0,
            x1Offset: orientation === 'h' ? (pos0.x <= pos1.x ? pos1.width / 2 : pos0.width / 2) : 0,
            y0Offset: orientation === 'v' ? (pos0.y <= pos1.y ? pos0.height / 2 : pos1.height / 2) : 0,
            y1Offset: orientation === 'v' ? (pos0.y <= pos1.y ? pos1.height / 2 : pos0.height / 2) : 0,
            flipped: (pos0.x > pos1.x && pos0.y < pos1.y) || (pos0.x < pos1.x && pos0.y > pos1.y)
        }
    }

    render() {
        const { pos0, pos1 } = this.props;
        const position = this.getMin(pos0, pos1);
        if (position.orientation === 'h') {
            return this.renderHorizontal(position);
        }
        return this.renderVertical(position);
    }

    renderVertical(position) {
        const {x0, x1, y0, y1, y0Offset, y1Offset, flipped} = position;
        const dx = x1 - x0;
        if (dx === 0) {
            return <Line {...this.props} />
        }

        const borderWidth = this.props.borderWidth || defaultBorderWidth;
        const y2 = Math.round((y0 + y1) / 2);

        const xOffset = dx > 0 ? borderWidth : 0;
        const minX = Math.min(x0, x1) - xOffset;
        const maxX = Math.max(x0, x1);

        return (
            <div className="react-steppedlineto" style={{position: 'absolute', top: y0, left: x0, width: `${x1-x0}px`, height: `${y1-y0}px`}}>
                {
                    !flipped ?
                        <Fragment>
                            <Line {...this.props} x0={0} y0={y0Offset} x1={0} y1={y2 - y0} />
                            <Line {...this.props} x0={x1 - x0} y0={y1 - y0 - y1Offset} x1={x1 - x0} y1={y2 - y0} arrow={true} orientation={'v'} />
                            <Line {...this.props} x0={minX - x0} y0={y2 - y0} x1={maxX - x0} y1={y2 - y0} />
                        </Fragment> :
                        <Fragment>
                            <Line {...this.props} x0={0} y0={y1 - y0 - y1Offset} x1={0} y1={y2 - y0} arrow={true} orientation={'v'} />
                            <Line {...this.props} x0={x1 - x0} y0={y0Offset} x1={x1 - x0} y1={y2 - y0}  />
                            <Line {...this.props} x0={minX - x0 + xOffset} y0={y2 - y0} x1={maxX - x0} y1={y2 - y0} />
                        </Fragment>
                }
            </div>
        );
    }

    renderHorizontal(position) {
        const {x0, x1, y0, y1, x0Offset, x1Offset, flipped} = position;
        const dy = y1 - y0;
        if (dy === 0) {
            return <Line {...this.props} />
        }

        const borderWidth = this.props.borderWidth || defaultBorderWidth;
        const x2 = (x0 + x1) / 2;

        const yOffset = dy < 0 ? borderWidth : 0;
        const minY = Math.min(y0, y1) - yOffset;
        const maxY = Math.max(y0, y1);

        return (
            <div className="react-steppedlineto" style={{position: 'absolute', top: y0, left: x0, width: `${x1-x0}px`, height: `${y1-y0}px`}}>
        {
            !flipped ?
                <Fragment>
                    <Line {...this.props} x0={x0Offset} y0={0} x1={x2 - x0} y1={0} arrow={true} orientation={'h'}/>
                    <Line {...this.props} x0={x1 - x0 - x1Offset} y0={y1 - y0} x1={x2 - x0} y1={y1 - y0} />
                    <Line {...this.props} x0={x2 - x0} y0={minY - y0} x1={x2 - x0} y1={maxY - y0} />
                </Fragment> :
                <Fragment>
                    <Line {...this.props} x0={x1 - x0 - x1Offset} y0={0} x1={x2 - x0} y1={0} />
                    <Line {...this.props} x0={x0Offset} y0={y1 - y0} x1={x2 - x0} y1={y1 - y0} arrow={true} orientation={'h'} />
                    <Line {...this.props} x0={x2 - x0} y0={minY - y0} x1={x2 - x0} y1={maxY - y0} />
                </Fragment>
        }
    </div>
        );
    }
}

SteppedLine.propTypes = Object.assign({}, {
    pos0: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number
    }).isRequired,
    pos1: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number,
        width: PropTypes.number,
        height: PropTypes.number
    }).isRequired,
    orientation: PropTypes.oneOf(['h', 'v']),
}, optionalStyleProps);
