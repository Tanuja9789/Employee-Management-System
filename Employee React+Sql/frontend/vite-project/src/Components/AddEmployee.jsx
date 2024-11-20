import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddEmployee.css'; // If the CSS file is in the same folder


const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: '',
    employeeId: '',
    department: '',
    designation: '',
    projectType: '',
    status: '',
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setEmployee((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(employee).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post('http://localhost:5000/api/employees', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Employee added successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Employee</h2>
      <form onSubmit={handleSubmit} className="p-4 shadow bg-light rounded">
        <div className="mb-3">
          <label className="form-label">Profile Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleFileChange}
            className="form-control"
            required
          />
        </div>

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
          <label className="form-label">Employee ID</label>
          <input
            type="text"
            name="employeeId"
            value={employee.employeeId}
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
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;
