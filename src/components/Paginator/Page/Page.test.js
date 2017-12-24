import 'babel-polyfill'; // required for Object.values

import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
import Page from './Page';

test('Page changes classes if isActive or isDisabled props change', () => {
  const testProps = {
    isActive: false,
    isDisabled: false,
    page: 4,
    onPageChange: () => {}
  };
  const component = Enzyme.shallow( <Page {...testProps} />);
  
  expect(component).toMatchSnapshot();

  // change props and rerender
  component.setProps({ isActive: true });
  expect(component).toMatchSnapshot();

  // change props and rerender
  component.setProps({ isActive: false });
  component.setProps({ isDisabled: true });
  expect(component).toMatchSnapshot();
});