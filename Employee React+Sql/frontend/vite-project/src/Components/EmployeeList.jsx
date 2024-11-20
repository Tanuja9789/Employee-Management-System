import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data); // Assuming data is an array of employees
    } catch (error) {
      console.error('Error fetching employees:', error);
      // alert('Error fetching employees');
    }
  };
  
  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        alert('Employee deleted successfully');
        fetchEmployees(); // Refresh employee list
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee List</h2>
      <div className="text-end mb-3">
        <Link to="/add" className="btn btn-primary">
          Add Employee
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Photo</th>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Project Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${employee.photo}`}
                    alt="Profile"
                    className="img-thumbnail"
                    style={{ width: '50px', height: '50px' }}
                  />
                </td>
                <td>{employee.employeeId}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.designation}</td>
                <td>{employee.projectType}</td>
                <td>{employee.status}</td>
                <td>
                  <Link to={`/edit/${employee.id}`} className="btn btn-sm btn-warning me-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
