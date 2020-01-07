import React from 'react';

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  deleteStudent() {
    this.props.deleteStudent(this.props.grade.id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.grade.name}</td>
        <td>{this.props.grade.course}</td>
        <td>{this.props.grade.grade}</td>
        <td><button onClick={this.deleteStudent} className='btn-danger'>Delete</button></td>
      </tr>
    );
  }
}

export default Grade;
