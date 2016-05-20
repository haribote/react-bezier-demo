// import modules
const assert = require("power-assert");
import React from "react";
import {shallow} from 'enzyme';
import App from '../src/components/app';
import BezierCurve from '../src/components/bezier-curve';
import HorizontalLine from '../src/components/horizontal-line';
import Point from '../src/components/point';
import VerticalLine from '../src/components/vertical-line';

// test
describe('<App />', () => {
  it('renders 1 <BezierCurve /> component', () => {
    const wrapper = shallow(<App />);
    assert(wrapper.find(BezierCurve).length === 1);
  });
  it('renders 5 <HorizontalLine /> components', () => {
    const wrapper = shallow(<App />);
    assert(wrapper.find(HorizontalLine).length === 5);
  });
  it('renders 9 <Point /> components', () => {
    const wrapper = shallow(<App />);
    assert(wrapper.find(Point).length === 9);
  });
  it('renders 9 <VerticalLine /> components', () => {
    const wrapper = shallow(<App />);
    assert(wrapper.find(VerticalLine).length === 9);
  });
});
