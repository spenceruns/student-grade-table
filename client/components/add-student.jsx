// Ignore this for now. I wanted to add the add student as a modal

import React from 'react';

function AddStudent(props) {
  return (
    <form>
      <div className="input-group my-2">
        <div className="input-group-text"><i className="fa fa-user"></i></div>
        <input onChange={props.handleNameChange} className="form-control" type="text" placeholder="Name" />
      </div>
      <div className="input-group my-2">
        <div className="input-group-text"><i className="fa fa-book-open"></i></div>
        <input onChange={props.handleCourseChange} className="form-control" type="text" placeholder="Course" />
      </div>
      <div className="input-group my-2">
        <div className="input-group-text"><i className="fa fa-pencil-alt"></i></div>
        <input onChange={props.handleGradeChange} className="form-control" type="text" placeholder="Grade" />
      </div>
      <div className="btn-group btn-group-sm my-2 float-right">
        <button onClick={props.handleSubmit} className="btn btn-success">Add</button>
        <button onClick={props.handleReset} className="btn btn-secondary">Cancel</button>
      </div>
    </form>
  );
}

export default AddStudent;
