import React from 'react';
import Header from './header';
import GradeTable from './grade-table';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grades: [],
      averageGrade: 0
    };
  }

  componentDidMount() {
    fetch('/api/grades')
      .then(res => res.json())
      .then(data => this.setState({ grades: data }, () => {
        this.getAverageGrade();
      }));
  }

  getAverageGrade() {
    let total = 0;
    let amountOfStudents = 0;
    let average = 0;

    this.state.grades.forEach(grade => {
      total += grade.grade;
      amountOfStudents++;
    });
    average = Math.round(total / amountOfStudents);
    this.setState({ averageGrade: average });
  }

  render() {
    return (
      <div>
        <Header averageGrade={this.state.averageGrade}/>
        <GradeTable grades={this.state.grades}/>
      </div>
    );
  }
}

export default App;
