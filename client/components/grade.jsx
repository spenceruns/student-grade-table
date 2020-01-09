import React from 'react';

function DisplayStudent(props) {
  return (
    <tr className="d-flex text-center">
      <td className="col-3">{props.grade.name}</td>
      <td className="col-3">{props.grade.course}</td>
      <td className="col-3">{props.grade.grade}</td>
      <td className='col-3 text-center'>
        <div className='btn-group-sm'>
          <button onClick={props.edit} className='btn btn-info'>Update</button>
          <button onClick={props.delete} className='btn btn-danger'>Delete</button>
        </div>
      </td>
    </tr>
  );
}

class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      course: '',
      grade: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleGradeChange = this.handleGradeChange.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
  }

  componentDidMount() {
    this.setState({
      name: this.props.grade.name,
      course: this.props.grade.course,
      grade: this.props.grade.grade
    });
  }

  handleNameChange(event) {
    event.preventDefault();
    this.setState({ name: event.target.value });
  }

  handleCourseChange(event) {
    event.preventDefault();
    this.setState({ course: event.target.value });
  }

  handleGradeChange(event) {
    event.preventDefault();
    this.setState({ grade: parseInt(event.target.value) });
  }

  updateStudent() {
    this.props.updateStudent(this.props.grade.id, this.state);
    this.props.submit();
  }

  render() {
    return (
      <tr className="d-flex">
        <td className="col-3"><input className="col-12 text-center" onChange={this.handleNameChange} type="text" value={this.state.name} /></td>
        <td className="col-3"><input className="col-12 text-center" onChange={this.handleCourseChange} type="text" value={this.state.course} /></td>
        <td className="col-3"><input className="col-12 text-center" onChange={this.handleGradeChange} type="text" value={this.state.grade} /></td>
        <td className='col-3 text-center'>
          <div className='btn-group-sm'>
            <button onClick={this.updateStudent} className='btn btn-warning'>Done</button>
          </div>
        </td>
      </tr>
    );
  }
}

class Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editStudent: false
    };
    this.editStudent = this.editStudent.bind(this);
    this.submitStudent = this.submitStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  editStudent() {
    this.setState({ editStudent: true });
  }

  submitStudent() {
    this.setState({ editStudent: false });
  }

  deleteStudent() {
    this.props.deleteStudent(this.props.grade.id);
  }

  render() {
    return this.state.editStudent ? <EditStudent updateStudent={this.props.updateStudent} submit={this.submitStudent} grade={this.props.grade} /> : <DisplayStudent grade={this.props.grade} edit={this.editStudent} delete={this.deleteStudent} />;
  }
}

export default Grade;
