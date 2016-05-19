// import modules
import React from 'react';

/**
 * @export BezierCurve
 */
export default class BezierCurve extends React.Component {
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
   * @returns {{values: Array}}
   */
  static get defaultProps() {
    return {
      values: [],
      width : 960,
      height: 540,
      stroke: '#fff'
    }
  }

  /**
   * @method renderer
   * @returns {XML}
   */
  render() {
    // cache
    const {height, stroke} = this.props;

    // element
    return (
      <path d={`M${0},${height * .5 -.5} ${this.getCurves()}`} stroke={stroke} strokeWidth={5} fill="none"/>
    );
  }

  /**
   * @method create curve parameters
   * @returns {string|*}
   */
  getCurves() {
    // cache
    const {values, width} = this.props;
    const widthPerItem = width / (values.length + 1);
    const handleWidth  = widthPerItem / 2;

    // functions
    const getY = (val) => {
      return this.props.getY(val);
    };
    const getCurve = (startX, startY, endX, endY) => {
      return `C${startX},${startY.toFixed(1)} ${startX},${endY.toFixed(1)} ${endX},${endY.toFixed(1)}`;
    };

    // calc
    return values
      .map((val, i) => {
        // cache
        const prev   = values[i - 1];
        const startX = widthPerItem * i + handleWidth;
        const startY = Number.isFinite(prev) ? getY(prev) : getY(50);
        const endX   = widthPerItem * (i + 1);
        const endY   = getY(val);

        return getCurve(startX, startY, endX, endY);
      })
      .concat([(() => {
        // cache
        const length = values.length;
        const last   = values[length - 1];
        const startX = widthPerItem * length + handleWidth;
        const startY = getY(last);
        const endX   = widthPerItem * (length + 1);
        const endY   = getY(50);

        return getCurve(startX, startY, endX, endY);
      })()])
      .join(' ');
  }
}
