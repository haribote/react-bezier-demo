// import modules
const assert = require("power-assert");
import React from "react";
import {shallow} from 'enzyme';
import BezierCurve from '../src/components/bezier-curve';

// test
describe('<BezierCurve />', () => {
  it('renders 1 <BezierCurve /> component', () => {
    const values  = [25, 75, 0, 100, 25, 75, 0, 100, 25];
    const width   = 960;
    const height  = 500;
    const getY    = (val) => {
      return height * (val / 100) - .5;
    };
    const wrapper = shallow(<BezierCurve values={values} width={width} height={height} getY={getY} stroke="orange"/>);
    assert.equal(wrapper.html(), '<path d="M0,249.5 C48,249.5 48,124.5 96,124.5 C144,124.5 144,374.5 192,374.5 C240,374.5 240,-0.5 288,-0.5 C336,-0.5 336,499.5 384,499.5 C432,499.5 432,124.5 480,124.5 C528,124.5 528,374.5 576,374.5 C624,374.5 624,-0.5 672,-0.5 C720,-0.5 720,499.5 768,499.5 C816,499.5 816,124.5 864,124.5 C912,124.5 912,249.5 960,249.5" stroke="orange" stroke-width="5" fill="none"></path>');
  });
});
