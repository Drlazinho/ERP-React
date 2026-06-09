import React from 'react';

const LabelTextArea = ({ label, ...rest }) => {
  return (
    <div className="d-flex flex-column gap-2">
      <label className="form-label mb-0">{label}</label>
      <textarea className="form-control" {...rest} />
    </div>
  );
};

export default LabelTextArea;
