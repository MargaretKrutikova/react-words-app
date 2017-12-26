import React from 'react';

const pageHeaderStyles = {
  padding: '10px 0 20px 0'
};

const PageHeader = (props) => {
  return (
    <div style={pageHeaderStyles}>
      <h1>{props.children}</h1>
    </div>
  );
};

export default PageHeader;