import React, { useState, useEffect } from 'react';
import axios from 'axios';


const ContactInformation = () => {
  const [contactinformation, setContactInformation] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    // Update the URL to point to your Flask backend
    axios.get('http://127.0.0.1:5000/api/ContactInformation')
      .then(response => {
        if (response.status === 200) {
            setContactInformation(response.data);
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
    return contactinformation.map(contactinformation => {
     

      return (
        <tr key={contactinformation.id}>
          <td>
            <input
              type="checkbox"
              checked={selectedEmployees.includes(contactinformation.id)}
              onChange={() => handleCheckboxChange(contactinformation.id)}
            />
          </td>
          <td>{contactinformation.id}</td>
          <td>{contactinformation.name}</td>
          <td>{contactinformation.age}</td>
          <td>{contactinformation.home_phone} years</td>
          <td>{contactinformation.title}</td> {/* Display home_phone */}
          <td>{contactinformation.address}</td>
          <td>{contactinformation.country}</td>
          <td>{contactinformation.postal_code}</td>

        </tr>
      );
    });
  };

  return (
    <div>
      <h1>Contact Information</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Numbers</th>
            <th>Title</th> {/* Add the column header */}
            <th>Address</th>
            <th>Country</th>
            <th>Zip Code</th>

          </tr>
        </thead>
        <tbody>
          {renderTableRows()}
        </tbody>
      </table>
    </div>
  );
};

export default ContactInformation;
