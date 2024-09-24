import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './AttendanceDetails.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import userImage1 from '../../../Assets/user-1.png';
import userImage2 from '../../../Assets/user-2.png';
import userImage3 from '../../../Assets/user-3.png';
import userImage4 from '../../../Assets/user-4.png';

const AttendanceDetails = () => {
  const { ticketNumber } = useParams();
  const [ticketDetails, setTicketDetails] = useState({
    ticketNumber: ticketNumber,
    journeyDate: '2024-06-25',
    departureCity: 'Lagankhel',
    arrivalCity: 'maitidevi',
    busType: 'Deluxe',
    packageType: '3 Months',
    totalFare: 1500,
    status: 'Confirmed',
    passenger: {
      name: 'Ram Prasad Adhikari',
      email: 'ramprasad.adhikari@example.com',
      phoneNumber: '9841234567',
    }
  });

  const [filteredPassengers, setFilteredPassengers] = useState([ticketDetails.passenger]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredPassengers.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFilterChange = (status) => {
    // Not applicable for ticket details
    // You might implement this if you have multiple passengers on a ticket
  };

  // Function to convert ticketDetails to CSV format
  const handleDownloadCSV = () => {
    const csvData = `Ticket Number,Journey Date,Departure City,Arrival City,Bus Type,Package Type,Total Fare,Status,Passenger Name,Passenger Email,Passenger Phone`;
    // Removed Email from CSV data
    const csvRows = [
      `${ticketDetails.ticketNumber},${ticketDetails.journeyDate},${ticketDetails.departureCity},${ticketDetails.arrivalCity},${ticketDetails.busType},${ticketDetails.packageType},${ticketDetails.totalFare},${ticketDetails.status},${ticketDetails.passenger.name},${ticketDetails.passenger.email},${ticketDetails.passenger.phoneNumber}`
    ];

    const blob = new Blob([csvData + '\n' + csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${ticketDetails.ticketNumber}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="ticket-details-container">
      <div className="back-button">
        <Link to="/admin/attendance"> Back to Ticket List </Link>
      </div>
      <h2>Ticket Details</h2>
      <div className="ticket-details__container">
        <div className="class-details">
          <h3>Ticket Information</h3>
          <p>Ticket Number: {ticketDetails.ticketNumber}</p>
          <p>Journey Date: {ticketDetails.journeyDate}</p>
          <p>Departure City: {ticketDetails.departureCity}</p>
          <p>Arrival City: {ticketDetails.arrivalCity}</p>
          <p>Bus Type: {ticketDetails.busType}</p>
          <p>Package Type: {ticketDetails.packageType}</p>
          <p>Total Fare: {ticketDetails.totalFare}</p>
          <p>Status: {ticketDetails.status}</p>
        </div>
        <div className="student-attendance">
          <h3>Passenger Details</h3>
          <div className="attendance-controls">
            {/* <div className="filter-attendance">
              <button className="filter-btn active" onClick={() => handleFilterChange('All')}>
                All
              </button>
              <button className="filter-btn" onClick={() => handleFilterChange('Present')}>
                Present
              </button>
              <button className="filter-btn" onClick={() => handleFilterChange('Absent')}>
                Absent
              </button>
            </div> */}
            <button className="download-csv" onClick={handleDownloadCSV}>
              Download CSV
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((passenger, index) => (
                <tr key={index}>
                  <td>
                    <img 
                      src={
                        index === 0 ? userImage1 : 
                        index === 1 ? userImage2 :
                        index === 2 ? userImage3 : 
                        userImage4 
                      } 
                      alt="User" 
                      className="user-image" 
                    />
                    {passenger.name}
                  </td>
                  <td>{passenger.email}</td>
                  <td>{passenger.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="pagination">
            <p>
              Showing {indexOfFirstEntry + 1} to{' '}
              {indexOfLastEntry > filteredPassengers.length
                ? filteredPassengers.length
                : indexOfLastEntry}{' '}
              of {filteredPassengers.length} entries
            </p>
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
              <FaChevronLeft /> Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(filteredPassengers.length / entriesPerPage)
              }
            >
              Next <FaChevronRight />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AttendanceDetails;