const express = require('express');
const app = express();
const pg = require('pg');

const db = new pg.Pool({
  connectionString: 'postgres://dev:lfz@localhost/studentGradeTable'
});

app.use(express.json());

class ApiError {
  constructor(message, statusCode) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

app.get('/api/grades', (req, res, next) => {
  const sql = `
  select *
    from "grades"
    order by "gradeId" ASC
  `;
  db.query(sql)
    .then(result => {
      const grades = result.rows;
      res.status(200).json(grades);
    })
    .catch(err => console.error(err));
});

app.post('/api/grades', (req, res, next) => {
  const message = checkForValidPostReq(req);
  if (message) {
    return next(new ApiError(message, 400));
  }
  const sql = `
  insert into "grades" ("name", "course", "grade")
  values ($1, $2, $3)
  returning *
  `;
  const studentToAdd = [req.body.name, req.body.course, parseInt(req.body.grade)];
  db.query(sql, studentToAdd)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => console.error(err));
});

app.put('/api/grades/:gradeId', (req, res, next) => {
  const { gradeId } = req.params;
  const gradeIdMessage = checkForValidGradeId(gradeId);
  const gradeMessage = checkForValidGradeEntry(req);
  if (gradeIdMessage) {
    return next(new ApiError(gradeIdMessage, 400));
  } else if (gradeMessage) {
    return next(new ApiError(gradeMessage, 400));
  }
  const sql = `
  update "grades"
     set "name" = $1,
         "course" = $2,
         "grade" = $3
   where "gradeId" = $4
  returning *
  `;
  const studentToUpdate = [req.body.name, req.body.course, parseInt(req.body.grade), gradeId];
  db.query(sql, studentToUpdate)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        return next(new ApiError(`Cannot find student with grade ID ${gradeId}.`, 404));
      } else {
        res.status(200).json(grade);
      }
    })
    .catch(err => console.error(err));
});

app.delete('/api/grades/:gradeId', (req, res, next) => {
  const { gradeId } = req.params;
  const message = checkForValidGradeId(gradeId);
  if (message) {
    return next(new ApiError(message, 400));
  }
  const sql = `
   delete from "grades"
   where "gradeId" = $1
   returning *
  `;
  const studentToDelete = [gradeId];
  db.query(sql, studentToDelete)
    .then(result => {
      const grade = result.rows[0];
      if (!grade) {
        return next(new ApiError(`Cannot find student with grade ID ${gradeId}.`, 404));
      } else {
        res.status(200).json(`Successfully deleted student with grade ID ${gradeId}.`);
      }
    })
    .catch(err => console.error(err));
});

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: err.message
    });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'An unknown error occured. Please try again later.'
    });
  }
});

function checkForValidPostReq(req) {
  const grade = parseInt(req.body.grade);
  if (!req.body.name || !req.body.course || !req.body.grade) {
    return "Please enter a student's name, course and grade.";
  } else if (typeof req.body.name !== 'string') {
    return 'Student must have a valid name.';
  } else if (typeof req.body.course !== 'string') {
    return 'Course must have a valid name.';
  } else if (isNaN(grade) || grade < 0) {
    return 'Grade must be a positive integer.';
  }
  return false;
}

function checkForValidGradeId(gradeId) {
  if (!parseInt(gradeId)) {
    return 'Grade ID must be a postiive integer.';
  }
  return false;
}

function checkForValidGradeEntry(req) {
  const grade = parseInt(req.body.grade);
  if (!grade) {
    return 'A new grade must be entered.';
  } else if (isNaN(grade) || grade < 0) {
    return 'Grade must be a positive integer.';
  }
  return false;
}

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('Listening to port 3000 now!');
});
