import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';
import Alert from './error-alert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      error: null
    };
    this.addStudent = this.addStudent.bind(this);
    this.updateStudent = this.updateStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.handleError = this.handleError.bind(this);
    this.hideError = this.hideError.bind(this);
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(data => this.setState({ grades: data }))
      .catch(err => console.error(err));
  }

  addStudent(studentInfo) {
    fetch('/api/grades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentInfo)
    })
      .then(res => res.json())
      .then(data => {
        const newList = [...this.state.grades];
        newList.push(data);
        this.setState({ grades: newList });
      });
  }

  updateStudent(id, studentInfo) {
    fetch(`/api/grades/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(studentInfo)
    })
      .then(res => res.json())
      .then(data => {
        const newList = [...this.state.grades];
        const index = newList.findIndex(student => student.gradeId === id);
        newList[index] = data;
        this.setState({ grades: newList });
      });
  }

  deleteStudent(id) {
    fetch(`/api/grades/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const newList = this.state.grades.filter(student => student.gradeId !== id);
        this.setState({ grades: newList });
      });
  }

  handleError(error) {
    this.setState({ error: error });
    this.hideError();
  }

  hideError() {
    setTimeout(() => this.setState({ error: null }), 5000);
  }

  getAverageGrade() {
    let total = 0;
    let amountOfStudents = 0;
    this.state.grades.forEach(grade => {
      total += grade.grade;
      amountOfStudents++;
    });
    return (total / amountOfStudents).toFixed(0);
  }

  render() {
    const average = (this.state.grades.length > 0) ? this.getAverageGrade() : 0;
    const error = this.state.error && <Alert error={this.state.error} />;
    return (
      <div className="container">
        <div className="row border-bottom">
          <Header averageGrade={average} />
          {error}
        </div>
        <div className="row">
          <div className="col-lg-8 mt-3">
            <GradeTable updateStudent={this.updateStudent} deleteStudent={this.deleteStudent} handleError={this.handleError} grades={this.state.grades} />
          </div>
          <div className="col-lg-4 mt-3">
            <GradeForm addStudent={this.addStudent} handleError={this.handleError} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
