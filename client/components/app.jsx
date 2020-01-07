import React from 'react';
import Header from './header';
import GradeTable from './grade-table';
import GradeForm from './grade-form';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
    this.addStudent = this.addStudent.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
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

  deleteStudent(id) {
    const newList = this.state.grades.filter(student => student.id !== id);
    this.setState({ grades: newList });
    fetch(`/api/grades/${id}`, {
      method: 'DELETE'
    });
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
    return (
      <div className="container">
        <div className="row">
          <Header averageGrade={average} />
        </div>
        <div className="row">
          <div className="col-8">
            <GradeTable deleteStudent={this.deleteStudent} grades={this.state.grades} />
          </div>
          <div className="col-4">
            <GradeForm addStudent={this.addStudent} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
