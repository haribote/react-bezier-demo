// import modules
const assert = require("power-assert");
import React from "react";
import {shallow} from 'enzyme';
import sinon from 'sinon';
import Point from '../src/components/point';

// temporary component
class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {values} = this.props;
    const xList = values.map((val, i) => {
      return 960 / (values.length + 1) * (i + 1) - .5;
    });
    const getY  = (val) => {
      return 500 * (val / 100) - .5;
    };
    return (
      <g>
        {values.map((val, i) => {
          return (
            <Point key={i} index={i} r={10} x={xList[i]} y={getY(val)} stroke="orange" onMouseDown={() => { return; }}/>
          );
        })}
      </g>
    );
  }
}

// test
describe('<Point />', () => {
  it('renders 9 <Point /> components', () => {
    const wrapper = shallow(<ParentComponent values={[25, 75, 0, 100, 25, 75, 0, 100, 25]}/>);
    assert(wrapper.find(Point).length === 9);
    assert.equal(wrapper.html(), '<g><circle r="10" cx="0" cy="0" fill="orange" transform="translate(95.5, 124.5)" style="cursor:pointer;"></circle><circle r="10" cx="0" cy="0" fill="orange" transform="translate(191.5, 374.5)" style="cursor:pointer;"></circle><circle r="10" cx="0" cy="0" fill="orange" transform="translate(287.5, -0.5)" style="cursor:pointer;"></circle><circle r="10" cx="0" cy="0" fill="orange" transform="translate(383.5, 499.5)" style="cursor:pointer;"></circle><circle r="10" cx="0" cy="0" fill="orange" transform="translate(479.5, 124.5)" style="cursor:pointer;"></circle><circle r="10" cx="0" cy="0" fill="orange" transform="translate(575.5, 374.5)" style="cursor:pointer;"></circle><circle r="10" cx="0" cy="0" fill="orange" transform="translate(671.5, -0.5)" style="cursor:pointer;"></circle><circle r="10" cx="0" cy="0" fill="orange" transform="translate(767.5, 499.5)" style="cursor:pointer;"></circle><circle r="10" cx="0" cy="0" fill="orange" transform="translate(863.5, 124.5)" style="cursor:pointer;"></circle></g>')
  });
  it('simulates mousedown events', () => {
    const onMouseDown = sinon.spy();
    const wrapper = shallow(<Point index={0} r={10} x={95.5} y={124.5} stroke="orange" onMouseDown={onMouseDown}/>);
    wrapper.find('circle').simulate('mouseDown', { pageY: 20 });
    assert(onMouseDown.calledOnce);
  });
});
