import React from 'react';
import Grade from './grade';

function EmptyTable() {
  return (
    <tr>
      <td colSpan='4' className='h4 text-center'>No Students Entered</td>
    </tr>
  );
}

function FilledTable(props) {
  return props.grades.map(grade => {
    return (
      <Grade deleteStudent={props.deleteStudent} key={grade.id} grade={grade} />
    );
  });
}

function GradeTable(props) {
  const status = (props.grades.length > 0) ? <FilledTable deleteStudent={props.deleteStudent} grades={props.grades} /> : <EmptyTable />;

  return (
    <table className="table table-bordered table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Student Name</th>
          <th>Course</th>
          <th>Grade</th>
          <th>Operations</th>
        </tr>
      </thead>
      <tbody>
        {status}
      </tbody>
    </table>
  );
}

export default GradeTable;
