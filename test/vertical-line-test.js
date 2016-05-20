// import modules
const assert = require("power-assert");
import React from "react";
import {shallow} from 'enzyme';
import VerticalLine from '../src/components/vertical-line';

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
    return (
      <g>
        {values.map((val, i) => {
          return (
            <VerticalLine key={i} x={xList[i]} startY={0} endY={540}/>
          );
        })}
      </g>
    );
  }
}

// test
describe('<VerticalLine />', () => {
  it('renders 9 <VerticalLine /> components', () => {
    const wrapper = shallow(<ParentComponent values={[25, 75, 0, 100, 25, 75, 0, 100, 25]}/>);
    assert(wrapper.find(VerticalLine).length === 9);
    assert.equal(wrapper.html(), '<g><path d="M95.5,0 V540" stroke="#666" stroke-width="1"></path><path d="M191.5,0 V540" stroke="#666" stroke-width="1"></path><path d="M287.5,0 V540" stroke="#666" stroke-width="1"></path><path d="M383.5,0 V540" stroke="#666" stroke-width="1"></path><path d="M479.5,0 V540" stroke="#666" stroke-width="1"></path><path d="M575.5,0 V540" stroke="#666" stroke-width="1"></path><path d="M671.5,0 V540" stroke="#666" stroke-width="1"></path><path d="M767.5,0 V540" stroke="#666" stroke-width="1"></path><path d="M863.5,0 V540" stroke="#666" stroke-width="1"></path></g>')
  });
});
