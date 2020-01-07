import React from 'react';

function Header(props) {
  return (
    <>
      <div className="col-md-6 col-12">
        <div className="h2 mt-4 md-text-left text-center">Student Grade Table</div>
      </div>
      <div className="col-md-6 col-12">
        <div className="h4 mt-md-4 md-text-right text-center">Average Grade<span className="ml-2 mb-1 align-middle badge badge-secondary">{props.averageGrade}</span></div>
      </div>
    </>
  );
}

export default Header;
