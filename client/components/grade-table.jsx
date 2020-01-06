import React from 'react';
import Grade from './grade';

function TableHeading(props) {
  return (
    <div className="row m-0 border-bottom bg-secondary">
      <h3 className="col mb-0 border-right text-white">Student Name</h3>
      <h3 className="col mb-0 border-right text-white">Course</h3>
      <h3 className="col mb-0 text-white">Grade</h3>
    </div>
  );
}

function EmptyTable() {
  return (
    <div className="row">
      <h1 className="mx-auto my-3">No Students Entered</h1>
    </div>
  );
}

function FilledTable(props) {
  return props.grades.map(grade => {
    return (
      <Grade key={grade.id} grade={grade} />
    );
  });
}

function GradeTable(props) {
  const status = (props.grades.length > 0) ? <FilledTable grades={props.grades} /> : <EmptyTable />;

  return (
    <div className="container border px-0">
      <TableHeading />
      {status}
    </div>
  );
}

export default GradeTable;
