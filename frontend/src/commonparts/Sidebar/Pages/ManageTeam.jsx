import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ManageTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    // Update the URL to point to your Flask backend
    axios.get('http://127.0.0.1:5000/api/team-members')
      .then(response => {
        if (response.status === 200) {
          setTeamMembers(response.data);
        } else {
          throw new Error('Failed to fetch team data');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = (employeeId) => {
    const isSelected = selectedEmployees.includes(employeeId);

    if (isSelected) {
      // If already selected, remove from selection
      setSelectedEmployees(selectedEmployees.filter(id => id !== employeeId));
    } else {
      // If not selected, add to selection
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const renderTableRows = () => {
    return teamMembers.map(teamMember => {
      const hireDate = new Date(teamMember.hire_date);
      const currentDate = new Date();
      const yearsOfService = currentDate.getFullYear() - hireDate.getFullYear();

      return (
        <tr key={teamMember.id}>
          <td>
            <input
              type="checkbox"
              checked={selectedEmployees.includes(teamMember.id)}
              onChange={() => handleCheckboxChange(teamMember.id)}
            />
          </td>
          <td>{teamMember.id}</td>
          <td>{teamMember.name}</td>
          <td>{teamMember.age}</td>
          <td>{yearsOfService} years</td>
          <td>{teamMember.home_phone}</td> {/* Display home_phone */}
        </tr>
      );
    });
  };

  return (
    <div>
      <h1>Manage Team</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Years of Service</th>
            <th>Phone Numbers</th> {/* Add the column header */}
          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default ManageTeam;
