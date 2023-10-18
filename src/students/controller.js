const pool = require('../../db');
const queries = require('../students/queries');

const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  // passing id from params to getStudentById query
  pool.query(queries.getStudentById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

const addStudent = (req, res) => {
  const { name, email, age, dob } = req.body;

  // check if email exist
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length > 0) {
      res.status(400).json('Email already exists!');
    }

    // add student to db
    pool.query(
      queries.addStudent,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).json('Student Created Successfully!');
      }
    );
  });
};

const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.removeStudent, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    // if student doesn't exit
    if (noStudentFound) {
      return res
        .status(400)
        .json('Student does not exist in the database, could not remove.');
    }

    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).json('Student removed successfully.');
    });
  });
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
};
