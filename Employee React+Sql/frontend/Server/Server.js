const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql');
const path = require('path');

const app = express();
const router = express.Router(); // Define the router here
const PORT = 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'employees_db',
  port:3306
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Database connected');
});

// File Upload Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });




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
    console.log('Fetched Employees:', results); // Log the results to see the data
    if (results.length === 0) {
      return res.status(404).send('No employees found');
    }
    res.json(results); // Returns all employees
  });
});


// Get Single Employee
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM employees WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error('Error fetching employee:', err);
      return res.status(500).send('Internal server error');
    }
    if (!result.length) {
      return res.status(404).send('Employee not found');
    }
    res.json(result[0]); // Return the specific employee
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

// Inside server.js or app.js

app.use('/api/employees', router);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
