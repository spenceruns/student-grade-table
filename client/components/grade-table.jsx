import React from 'react';
import Grade from './grade';

function EmptyTable() {
  return (
    <tr>
      <td>No Students Entered</td>
    </tr>
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
    <table className="table table-bordered table-striped">
      <thead className="thead-dark">
        <tr>
          <th className="h5">Student Name</th>
          <th className="h5">Course</th>
          <th className="h5">Grade</th>
        </tr>
      </thead>
      <tbody>
        {status}
      </tbody>
    </table>
  );
}

export default GradeTable;

// h2 pr-5 py-2 text-white bg-secondary border-right
