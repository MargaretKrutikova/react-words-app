import 'babel-polyfill'; // required for Object.values

import React from 'react';
//import Enzyme from 'enzyme';
//import Adapter from 'enzyme-adapter-react-16';

import App from './App';

// Enzyme.configure({ adapter: new Adapter() });

// describe('App', () => {
//   it('renders correctly', () => {
//     const wrapper = Enzyme.shallow(<App />);

//     expect(wrapper.children().length).toBe(2);
//     // snapshot expectations
//     expect(wrapper).toMatchSnapshot(); // if anything changes the snapshot expectation will fail
//   });
// });

import renderer from 'react-test-renderer';
test('Link renders correctly', () => {
  const tree = renderer
    .create(<App />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});