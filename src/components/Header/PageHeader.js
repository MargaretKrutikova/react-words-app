import React from 'react';

const PageHeader = (props) => {
  return (
    <div className='pt-4 pb-3'>
      <h2>{props.children}</h2>
    </div>
  );
};

export default PageHeader;