import React from 'react';

function Grade(props) {
  const bgColor = (props.grade.id % 2 === 0) ? 'row bg-light' : 'row';
  return (
    <div className="container">
      <div className={bgColor}>
        <div className="col border-right">{props.grade.name}</div>
        <div className="col border-right">{props.grade.course}</div>
        <div className="col">{props.grade.grade}</div>
      </div>
    </div>
  );
}

export default Grade;
