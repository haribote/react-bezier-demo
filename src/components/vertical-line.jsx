// import modules
import React from 'react';

/**
 * @export VerticalLine
 */
export default class VerticalLine extends React.Component {
  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    // 親を継承する
    super(props);
  }

  /**
   * @static default properties
   * @returns {{x: number, startY: number, endY: number}}
   */
  static get defaultProps() {
    return {
      x     : 0,
      startY: 0,
      endY  : 0
    }
  }

  /**
   * @method renderer
   * @returns {XML}
   */
  render() {
    // cache
    const {x, startY, endY} = this.props;

    // element
    return (
      <path d={`M${x.toFixed(1)},${startY} V${endY}`} stroke="#666" strokeWidth="1"/>
    );
  }
}
