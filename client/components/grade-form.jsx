import React from 'react';

class GradeForm extends React.Component {
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
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const gradeValue = parseInt(event.target.value);
    if (isNaN(gradeValue)) {
      this.setState({ grade: '' });
    } else {
      this.setState({ grade: parseInt(event.target.value) });
    }
  }

  handleReset() {
    event.preventDefault();
    this.setState({
      name: '',
      course: '',
      grade: ''
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.name || !this.state.course || !this.state.grade) {
      this.props.handleError("Please enter a student's name, course and grade.");
    } else {
      this.props.addStudent(this.state);
    }
    this.handleReset();
  }

  render() {
    return (
      <form>
        <div className="input-group my-2">
          <div className="input-group-text"><i className="fa fa-user"></i></div>
          <input onChange={this.handleNameChange} className="form-control" type="text" value={this.state.name} placeholder="Name" />
        </div>
        <div className="input-group my-2">
          <div className="input-group-text"><i className="fa fa-book-open"></i></div>
          <input onChange={this.handleCourseChange} className="form-control" type="text" value={this.state.course} placeholder="Course" />
        </div>
        <div className="input-group my-2">
          <div className="input-group-text"><i className="fa fa-pencil-alt"></i></div>
          <input onChange={this.handleGradeChange} className="form-control" type="text" value={this.state.grade} placeholder="Grade" />
        </div>
        <div className="btn-group-sm my-2 float-right">
          <button onClick={this.handleSubmit} className="btn btn-success">Add</button>
          <button onClick={this.handleReset} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    );
  }
}

export default GradeForm;
