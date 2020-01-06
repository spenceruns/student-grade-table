import React from 'react';

function Header(props) {
  return (
    <div className="container">
      <div className="row d-flex justify-content-between">
        <h1 className="mt-4">Student Grade Table</h1>
        <h2 className="mt-4">Average Grade<span className="badge badge-secondary">{props.averageGrade}</span></h2>
      </div>
    </div>
  );
}

export default Header;
