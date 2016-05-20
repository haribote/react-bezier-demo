// import modules
import React from 'react';
import VerticalLine from './vertical-line';
import HorizontalLine from './horizontal-line';
import BezierCurve from './bezier-curve';
import Point from './point';

/** @const */
const ZERO = 0;

/** @const */
const HANDRED = 100;

/** @const */
const QUARTER = HANDRED / 4;

/** @const */
const SNAPPING_THRESHOLD = .05;

/**
 * @export App
 */
export default class App extends React.Component {
  /**
   * @constructor
   * @param props
   */
  constructor(props) {
    // succeed
    super(props);

    // define states
    this.state = {
      values: [25, 75, 0, 100, 25, 75, 0, 100, 25],
      inDrag: false
    }
  }

  /**
   * @static default properties
   * @returns {{svgWidth: number, svgHeight: number, translateY: number, stroke: string}}
   */
  static get defaultProps() {
    return {
      svgWidth  : 960,
      svgHeight : 540,
      translateY: 20,
      stroke    : 'orange'
    };
  }

  /**
   * @prop computed areaHeight
   * @returns {number}
   */
  get areaHeight() {
    const {svgHeight, translateY} = this.props;
    return svgHeight - translateY * 2;
  }

  /**
   * @method renderer
   * @returns {XML}
   */
  render() {
    // cache
    const {svgWidth, svgHeight, translateY, stroke} = this.props;
    const {values, inDrag} = this.state;
    const areaHeight = this.areaHeight;
    const xList      = values.map((val, i) => {
      return svgWidth / (values.length + 1) * (i + 1) - .5;
    });

    // function
    const getY = (val) => {
      return areaHeight * (val / HANDRED) - .5;
    };

    // element
    return (
      <div style={{ 'width': svgWidth, 'margin': '0 auto' }}>
        <h1>React Bezier Demo</h1>
        <svg viewBox={`${0} ${0} ${svgWidth} ${svgHeight}`} width={svgWidth} height={svgHeight}
             style={{ cursor: inDrag ? 'pointer' : '' }}>
          <defs>
            <linearGradient id="g0" x1={0} y1={0} x2={0} y2={1}>
              <stop offset="0" stopColor="#001c58"/>
              <stop offset="1" stopColor="#00091d"/>
            </linearGradient>
          </defs>
          <rect x={0} y={0} width="100%" height="100%" fill="url(#g0)"/>
          {values.map((val, i) => {
            return (
              <VerticalLine key={i} x={xList[i]} startY={0} endY={svgHeight}/>
            );
          })}
          <g transform={`translate(0, ${translateY})`}>
            {([0, .25, .5, .75, 1]).map((y, i) => {
              return (
                <HorizontalLine key={i} startX={0} endX={svgWidth} y={areaHeight * y} isDashed={i % 2}/>
              );
            })}
            <BezierCurve values={values} width={svgWidth} height={areaHeight} getY={getY} stroke={stroke}/>
            {values.map((val, i) => {
              return (
                <Point key={i} index={i} r={translateY / 2} x={xList[i]} y={getY(val)} stroke={stroke}
                       onMouseDown={this.pointMouseDownHandler.bind(this)}/>
              );
            })}
          </g>
        </svg>
      </div>
    );
  }

  /**
   * @method mouse down event handler for Point
   * @param startY
   * @param index
   */
  pointMouseDownHandler(startY = 0, index = 0) {
    //cache
    const {values, inDrag} = this.state;
    const value = values[index];

    // check state
    if (inDrag || !Number.isFinite(startY) || !Number.isFinite(value)) {
      return;
    }

    // update state
    this.setState({
      inDrag: true
    });

    // function
    const updateValueTemp = (currentY) => {
      this.updateValue(value + HANDRED / this.areaHeight * (currentY - startY), index);
    };

    // handler
    const moveHandler = (evMove) => {
      updateValueTemp(evMove.pageY);
    };
    const upHandler   = (evUp) => {
      updateValueTemp(evUp.pageY);

      // update state
      this.setState({
        inDrag: false
      });

      // unbind event handlers
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };

    // bind event handlers
    window.addEventListener('mousemove', moveHandler, false);
    window.addEventListener('mouseup', upHandler, false);
  }

  /**
   * @method update value
   * @param newValue
   * @param index
   */
  updateValue(newValue = 0, index = 0) {
    // validate
    if (!Number.isFinite(newValue) || !Number.isFinite(index)) {
      return;
    }

    // update values
    this.setState({
      values: this.state.values.map((val, i) => {
        if (i === index) {
          // cache
          const quarterVal        = newValue / QUARTER;
          const roundedQuarterVal = Math.round(quarterVal);

          // calc
          return Math.min(
            Math.max(
              parseFloat((Math.abs(roundedQuarterVal - quarterVal) < SNAPPING_THRESHOLD ? roundedQuarterVal * QUARTER : newValue).toFixed(2)),
              ZERO
            ),
            HANDRED
          )
        } else {
          return val;
        }
      })
    });
  }
};
