// import modules
import React from 'react';

/**
 * @extend Point
 */
export default class Point extends React.Component {
  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    // succeed
    super(props);
  }

  /**
   * @static default properties
   * @returns {{r: number, x: number, y: number, stroke: string}}
   */
  static get defaultProps() {
    return {
      r     : 10,
      x     : 0,
      y     : 0,
      stroke: '#fff'
    }
  }

  /**
   * @method renderer
   * @returns {XML}
   */
  render() {
    // cache
    const {r, x, y, stroke} = this.props;

    // element
    return (
      <circle r={r} cx={0} cy={0} fill={stroke} transform={`translate(${x}, ${y})`} onMouseDown={this.mouseDownHandler.bind(this)} style={{ cursor: 'pointer' }}/>
    );
  }

  /**
   * @method mouse down event handler
   * @param ev
   */
  mouseDownHandler(ev) {
    this.props.onMouseDown(ev.pageY, this.props.index);
  }
};

