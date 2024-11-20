import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    department: '',
    designation: '',
    projectType: '',
    status: '',
    salary: '',
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
      alert('Failed to load employee data.');
    }
  };

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employees/${id}`, employee);
      alert('Employee updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Designation</label>
          <input
            type="text"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Project Type</label>
          <input
            type="text"
            name="projectType"
            value={employee.projectType}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={employee.status}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
