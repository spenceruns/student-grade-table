import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: []
    };
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(data => this.setState({ grades: data }))
      .catch(err => console.error(err));
  }

  getAverageGrade() {
    let total = 0;
    let amountOfStudents = 0;
    this.state.grades.forEach(grade => {
      total += grade.grade;
      amountOfStudents++;
    });
    return Math.round(total / amountOfStudents);
  }

  render() {
    const average = (this.state.grades.length > 0) ? this.getAverageGrade() : 0;
    return (
      <div>
        <Header averageGrade={average}/>
        <GradeTable grades={this.state.grades}/>
      </div>
    );
  }
}

export default App;
