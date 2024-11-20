const express = require('express');
const router = express.Router();

module.exports = (upload, db) => {
  // Add Employee
  router.post('/', upload.single('photo'), (req, res) => {
    const { name, employeeId, department, designation, projectType, status } = req.body;
    const photo = req.file ? req.file.filename : null;

    const sql = `INSERT INTO employees (name, employeeId, department, designation, projectType, status, photo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, employeeId, department, designation, projectType, status, photo], (err) => {
      if (err) {
        console.error('Error adding employee:', err);
        return res.status(500).send('Internal server error');
      }
      res.send('Employee added successfully');
    });
  });

  // Get All Employees
  router.get('/', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
      if (err) {
        console.error('Error fetching employees:', err);
        return res.status(500).send('Internal server error');
      }
      res.json(results);
    });
  });

  // Get Single Employee
  router.get('/:id', (req, res) => {
    db.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, result) => {
      if (err) {
        console.error('Error fetching employee:', err);
        return res.status(500).send('Internal server error');
      }
      res.json(result[0]);
    });
  });

  // Update Employee
  router.put('/:id', (req, res) => {
    const employee = req.body;
    db.query('UPDATE employees SET ? WHERE id = ?', [employee, req.params.id], (err) => {
      if (err) {
        console.error('Error updating employee:', err);
        return res.status(500).send('Internal server error');
      }
      res.send('Employee updated.');
    });
  });

  // Delete Employee
  router.delete('/:id', (req, res) => {
    db.query('DELETE FROM employees WHERE id = ?', [req.params.id], (err) => {
      if (err) {
        console.error('Error deleting employee:', err);
        return res.status(500).send('Internal server error');
      }
      res.send('Employee deleted.');
    });
  });

  return router;
};
