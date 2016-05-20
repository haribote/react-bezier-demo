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
    // succeed
    super(props);
  }

  /**
   * @static default properties
   * @returns {{values: Array, width: number, height: number, stroke: string}}
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
    const getY     = (val) => {
      return this.props.getY(val);
    };
    const getCurve = (x1, y1, x2, y2) => {
      return `C${x1},${y1.toFixed(1)} ${x1},${y2.toFixed(1)} ${x2},${y2.toFixed(1)}`;
    };

    // calc
    return values
      .map((val, i) => {
        // cache
        const prev = values[i - 1];
        const x1   = widthPerItem * i + handleWidth;
        const y1   = Number.isFinite(prev) ? getY(prev) : getY(50);
        const x2   = widthPerItem * (i + 1);
        const y2   = getY(val);

        return getCurve(x1, y1, x2, y2);
      })
      .concat([(() => {
        // cache
        const length = values.length;
        const last   = values[length - 1];
        const x1     = widthPerItem * length + handleWidth;
        const y1     = getY(last);
        const x2     = widthPerItem * (length + 1);
        const y2     = getY(50);

        return getCurve(x1, y1, x2, y2);
      })()])
      .join(' ');
  }
}
