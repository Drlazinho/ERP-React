import React from 'react';

const LabelInput = ({ label, ...rest }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input {...rest} className="form-control" />
    </>
  );
};

export default LabelInput;
