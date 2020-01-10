import React from 'react';

function Alert(props) {
  return (
    <div className="alert alert-danger fixed-top text-center font-weight-bold">{props.error}</div>
  );
}

export default Alert;
