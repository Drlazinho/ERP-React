import React from 'react';

const LabelSelect = ({ label, children, ...rest }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <select className="form-select" {...rest}>{children}</select>
    </>
  );
};

export default LabelSelect;
