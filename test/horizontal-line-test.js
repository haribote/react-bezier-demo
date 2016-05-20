// import modules
const assert = require("power-assert");
import React from "react";
import {shallow} from 'enzyme';
import HorizontalLine from '../src/components/horizontal-line';

// temporary component
class ParentComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <g>
        {this.props.list.map((y, i) => {
          return (
            <HorizontalLine key={i} startX={0} endX={960} y={500 * y} isDashed={i % 2}/>
          );
        })}
      </g>
    );
  }
}

// test
describe('<HorizontalLine />', () => {
  it('renders 5 <HorizontalLine /> components', () => {
    const wrapper = shallow(<ParentComponent list={[0, .25, .5, .75, 1]} />);
    assert(wrapper.find(HorizontalLine).length === 5);
    assert.equal(wrapper.html(), '<g><path d="M0,-0.5 H960" stroke="#999" stroke-width="1" stroke-dasharray=""></path><path d="M0,124.5 H960" stroke="#999" stroke-width="1" stroke-dasharray="2 2"></path><path d="M0,249.5 H960" stroke="#999" stroke-width="1" stroke-dasharray=""></path><path d="M0,374.5 H960" stroke="#999" stroke-width="1" stroke-dasharray="2 2"></path><path d="M0,499.5 H960" stroke="#999" stroke-width="1" stroke-dasharray=""></path></g>')
  });
});
