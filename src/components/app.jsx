// import modules
import React from 'react';
import VerticalLine from './vertical-line';
import HorizontalLine from './horizontal-line';
import BezierCurve from './bezier-curve';

/**
 * @export App
 */
export default class App extends React.Component {
  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    // 親クラスを継承する
    super(props);

    // ステートを定義する
    this.state = {
      values: [25, 75, 0, 100, 25]
    }
  }

  /**
   * @static default properties
   * @returns {{svgWidth: number, svgHeight: number}}
   */
  static get defaultProps() {
    return {
      svgWidth  : 960,
      svgHeight : 540,
      translateY: 20
    };
  }

  /**
   * @method renderer
   * @returns {XML}
   */
  render() {
    // cache
    const {svgWidth, svgHeight, translateY} = this.props;
    const areaHeight = svgHeight - translateY * 2;
    const {values} = this.state;
    const yList      = values.map((val, i) => {
      return svgWidth / (values.length + 1) * (i + 1) - .5;
    });

    // function
    const getY = (val) => {
      return areaHeight * (val / 100) - .5;
    };

    // element
    return (
      <div>
        <h1>React Bezier Demo</h1>
        <svg viewBox={`${0} ${0} ${svgWidth} ${svgHeight}`} width={svgWidth} height={svgHeight}>
          <defs>
            <linearGradient id="g0" x1={0} y1={0} x2={0} y2={1}>
              <stop offset="0" stopColor="#001c58"/>
              <stop offset="1" stopColor="#00091d"/>
            </linearGradient>
          </defs>
          <rect x={0} y={0} width="100%" height="100%" fill="url(#g0)"/>
          {values.map((val, i) => {
            return (
              <VerticalLine key={i} x={yList[i]} startY={0} endY={svgHeight}/>
            );
          })}
          <g transform={`translate(0, ${translateY})`}>
            {([0, .25, .5, .75, 1]).map((y, i) => {
              return (
                <HorizontalLine key={i} startX={0} endX={svgWidth} y={areaHeight * y}
                                isDashed={i % 2}/>
              );
            })}
            <BezierCurve values={this.state.values} width={svgWidth} height={areaHeight} getY={getY}/>
            {values.map((val, i) => {
              return (
                <circle key={i} r={translateY / 2} cx={0} cy={0} fill="orange"
                        transform={`translate(${yList[i]}, ${getY(val)})`}/>
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
};
