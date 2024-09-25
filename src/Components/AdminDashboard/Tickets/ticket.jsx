import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./AttendanceRecords.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { Clock, MapPin } from "lucide-react";
const Ticket = () => {
  // Example user data - Replace with actual data fetched from your system
  const [userData, setUserData] = useState([
    {
      name: "Ram Prasad Adhikari",
      email: "ramprasad.adhikari@example.com",
      phoneNumber: "9841234567",
      ticketNumber: "BT-12345",
      journeyDate: "2024-06-25",
      departureCity: "Lagankhel",
      arrivalCity: "Ratnapark",
      busType: "Deluxe",
      packageType: "3 Months",
      totalFare: 1500,
      status: "Confirmed",
    },
    {
      name: "Sunita Shrestha",
      email: "sunita.shrestha@example.com",
      phoneNumber: "9801234567",
      ticketNumber: "BT-54321",
      journeyDate: "2024-07-01",
      departureCity: "Kathmandu",
      arrivalCity: "Bhairahawa",
      busType: "AC",
      packageType: "1 Month",
      totalFare: 800,
      status: "Confirmed",
    },
  
  ]);

  const [filteredData, setFilteredData] = useState(userData);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [selectedName, setSelectedName] = useState("");
  const [selectedTicket, setSelectedTicket] = useState("");

  const loadData = async () => {
    

    const response = await axios.get(
      `http://localhost:8080/api/v1/getAlltickets`
    );
    // console.log(response.data.data);
    const filtered = response.data.data.filter((entry) => {
      const ticketMatch =
        selectedTicket === "" || entry.transaction_id === selectedTicket;
      return ticketMatch;
    });
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    loadData();
  }, [selectedName, selectedTicket, userData]);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleTicketChange = (event) => {
    setSelectedTicket(event.target.value);
  };

  return (
    <>
      <div className="ticket-container">
        <h2>Ticket Details</h2>

        <div className="ticket-controls">
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
                  <th>Start Date</th>
                  <th>End Date</th>

                  <th>Package Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.full_name}</td>
                    <td>{entry.ticket_number}</td>
                    <td>{entry.start_date}</td>
                    <td>{entry.end_date}</td>
                    <td>{entry.package}</td>
                    <td>{entry.price}</td>

                    <td>{entry.status}</td>
                    <td>
                      <Link
                        to={`/admin/ticket/${entry.ticket_id}`}
                        className="details-button"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="pagination">
              <p>
                Showing {indexOfFirstEntry + 1} to{" "}
                {indexOfLastEntry > filteredData.length
                  ? filteredData.length
                  : indexOfLastEntry}{" "}
                of {filteredData.length} entries
              </p>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FaChevronLeft /> Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={
                  currentPage ===
                  Math.ceil(filteredData.length / entriesPerPage)
                }
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ticket  */}
      <div className="grid gap-2 grid-cols-3 ticket-container">
        {currentEntries.map((entry, index) => (
          <div className="my-8 bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-[#4fa021] items-center flex justify-between text-white px-6 py-4">
              <h1 className="text-2xl font-bold">Bus Ticket</h1>
              <p className="font-bold">{entry.status}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Passenger</p>
                  <p className="text-lg font-semibold">{entry.full_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Ticket No.</p>
                  <p className="text-lg font-semibold">
                    {entry.ticket_number}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold">
                    {" "}
                    {entry.end_date
                      ? new Date(entry.start_date).toLocaleDateString()
                      : "Invalid date"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">End Date</p>
                  <p className="font-semibold">
                    {" "}
                    {entry.end_date
                      ? new Date(entry.end_date).toLocaleDateString()
                      : "Invalid date"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Ticket;
