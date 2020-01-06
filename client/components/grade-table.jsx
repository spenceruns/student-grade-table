import React from 'react';
import Grade from './grade';

function TableHeading(props) {
  return (
    <div className="row border-bottom border-dark bg-secondary">
      <div className="col h3 mb-0 border-right border-dark text-white">Student Name</div>
      <div className="col h3 mb-0 border-right border-dark text-white">Course</div>
      <div className="col h3 mb-0 text-white">Grade</div>
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
      <div key={props.grades.id} className="row" >
        <Grade grade={grade} />
      </div >
    );
  });
}

class GradeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmpty: true
    };
  }

  componentDidMount() {
    if (this.props.grades) {
      this.setState({ isEmpty: false });
    }
  }

  render() {
    const status = (this.state.isEmpty) ? <EmptyTable /> : <FilledTable grades={this.props.grades}/>;

    return (
      <div className="container border border-dark">
        <TableHeading />
        { status }
      </div>
    );
  }
}

export default GradeTable;
