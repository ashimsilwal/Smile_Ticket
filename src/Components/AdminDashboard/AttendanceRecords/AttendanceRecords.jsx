import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './AttendanceRecords.css'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const AttendanceRecords = () => {
  // Example user data - Replace with actual data fetched from your system
  const [userData, setUserData] = useState([
    {
      name: 'Ram Prasad Adhikari',
      email: 'ramprasad.adhikari@example.com',
      phoneNumber: '9841234567',
      ticketNumber: 'BT-12345',
      journeyDate: '2024-06-25',
      departureCity: 'Lagankhel',
      arrivalCity: 'Ratnapark',
      busType: 'Deluxe',
      packageType: '3 Months',
      totalFare: 1500,
      status: 'Confirmed' 
    },
    {
      name: 'Sunita Shrestha',
      email: 'sunita.shrestha@example.com',
      phoneNumber: '9801234567',
      ticketNumber: 'BT-54321',
      journeyDate: '2024-07-01',
      departureCity: 'Kathmandu',
      arrivalCity: 'Bhairahawa',
      busType: 'AC',
      packageType: '1 Month',
      totalFare: 800,
      status: 'Confirmed' 
    },
    // ... more user data
  ]);

  const [filteredData, setFilteredData] = useState(userData);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [selectedName, setSelectedName] = useState('');
  const [selectedTicket, setSelectedTicket] = useState('');

  useEffect(() => {
    const filtered = userData.filter((entry) => {
      const nameMatch = selectedName === '' || entry.name === selectedName;
      const ticketMatch = selectedTicket === '' || entry.ticketNumber === selectedTicket;
      return nameMatch && ticketMatch;
    });
    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [selectedName, selectedTicket, userData]);

  const uniqueNames = [...new Set(userData.map((entry) => entry.name))]; 

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNameChange = (event) => {
    setSelectedName(event.target.value);
  };

  const handleTicketChange = (event) => {
    setSelectedTicket(event.target.value);
  };

  return (
    <div className="ticket-container">
      <h2>Ticket Details</h2>

      <div className="ticket-controls">
        <div className="filter-name">
          <label htmlFor="filterName">Filter by Name:</label>
          <select id="filterName" value={selectedName} onChange={handleNameChange}>
            <option value="">All Users</option>
            {uniqueNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-ticket">
          <label htmlFor="filterTicket">Filter by Ticket Number:</label>
          <input
            type="text"
            id="filterTicket"
            value={selectedTicket}
            onChange={handleTicketChange}
          />
          <button className="search-button">Search</button>
        </div>
      </div>

      <div className="ticket-tables">
        <div className="ticket-details">
          <h3>Ticket Information</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Ticket Number</th>
                <th>Journey Date</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Bus Type</th>
                <th>Package</th>
                <th>Total Fare</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.name}</td>
                  <td>{entry.ticketNumber}</td>
                  <td>{entry.journeyDate}</td>
                  <td>{entry.departureCity}</td>
                  <td>{entry.arrivalCity}</td>
                  <td>{entry.busType}</td>
                  <td>{entry.packageType}</td>
                  <td>{entry.totalFare}</td>
                  <td>{entry.status}</td>
                  <td>
                    <Link to={`/admin/attendance/${entry.ticketNumber}`} className="details-button">
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <p>
              Showing {indexOfFirstEntry + 1} to{' '}
              {indexOfLastEntry > filteredData.length ? filteredData.length : indexOfLastEntry} of{' '}
              {filteredData.length} entries
            </p>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <FaChevronLeft /> Previous
            </button>
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredData.length / entriesPerPage)}>
              Next <FaChevronRight />
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AttendanceRecords;