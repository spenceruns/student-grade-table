import React from 'react';

function Header(props) {
  return (
    <>
      <div className="col-6">
        <div className="h2 mt-4">Student Grade Table</div>
      </div>
      <div className="col-6">
        <div className="h4 mt-4 text-right">Average Grade<span className="ml-2 mb-1 align-middle badge badge-secondary">{props.averageGrade}</span></div>
      </div>
    </>
  );
}

export default Header;
