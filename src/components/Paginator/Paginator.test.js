import 'babel-polyfill'; // required for Object.values

import React from 'react';
import Enzyme from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Paginator from './Paginator';
import Page from './Page/Page';

describe('Paginator', () => {
  it(' renders all pages to show with active page', () => {
    const testProps = {
      currentPage: 4,
      totalPages: 10,
      pagesToShow: [1, 2, 3, 4],
      onPageChange: jest.fn()
    };

    const wrapper = Enzyme.shallow(<Paginator {...testProps} />);

    const createPageElement = (onPageChange, page, isActive) => <Page onPageChange={onPageChange} isActive={isActive} page={page} />;
    const pagesToShowChildren = testProps.pagesToShow.map((page) => 
      createPageElement(testProps.onPageChange, page, page === testProps.currentPage)
    );
    expect(wrapper.containsAllMatchingElements(pagesToShowChildren)).toBe(true);

  });
});

