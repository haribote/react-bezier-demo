// import modules
import React from 'react';

/**
 * @export HorizontalLine
 */
export default class HorizontalLine extends React.Component {
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
   * @returns {{startX: number, endX: number, y: number, isDashed: boolean}}
   */
  static get defaultProps() {
    return {
      startX  : 0,
      endX    : 0,
      y       : 0,
      isDashed: false
    }
  }

  /**
   * @method renderer
   * @returns {XML}
   */
  render() {
    // cache
    const {startX, endX, y, isDashed} = this.props;

    // element
    return (
      <path d={`M${startX},${y -.5} H${endX}`} stroke="#999" strokeWidth={1} strokeDasharray={isDashed ? '2 2' : ''}/>
    );
  }
}
