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
      <Grade updateStudent={props.updateStudent} deleteStudent={props.deleteStudent} handleError={props.handleError} key={grade.gradeId} grade={grade} />
    );
  });
}

function GradeTable(props) {
  const status = (props.grades.length > 0) ? <FilledTable updateStudent={props.updateStudent} deleteStudent={props.deleteStudent} handleError={props.handleError} grades={props.grades} /> : <EmptyTable />;

  return (
    <div className="container-fluid">
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr className="d-flex text-center">
            <th className="col-3">Student Name</th>
            <th className="col-3">Course</th>
            <th className="col-3">Grade</th>
            <th className="col-3">Operations</th>
          </tr>
        </thead>
        <tbody>
          {status}
        </tbody>
      </table>
    </div>
  );
}

export default GradeTable;
