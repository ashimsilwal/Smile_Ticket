import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TicketDetails = () => {
  const { id } = useParams();

  const [ticket, setTicket] = useState();
  const [renderApp, setRenderApp] = useState(false);
  const [decision, setDecision] = useState("");

  const handleChange = async (event) => {
    try {
      const { value } = event.target; // Destructure value from event.target
      const response = await axios.post(
        `http://localhost:8080/api/v1/changestatus/${id}`, // Ensure 'id' is available
        { value }
      );
      setDecision(value); 
      alert("Status Successfully Changed")
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const loadData = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/ticketbyid/${id}`
    );
    setDecision(response.data.data.status); 
    setTicket(response.data.data);
    console.log(response.data.data);
    setRenderApp(true);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {renderApp ? (
        <div className="ml-[220px] mt-[100px] p-[20px]">
          <div className="flex">
            <div className="text-md font-medium text-gray-800">
              <div className="py-3">Name: {ticket.full_name}</div>
              <div className="py-3">Email: {ticket.email}</div>
              <div className="py-3">Transaction Id: {ticket.transaction_id}</div>
              <div className="py-3">Package Start Date: {ticket.start_date}</div>
              <div className="py-3">Package End Date: {ticket.end_date}</div>
              <img
                src={ticket.ticketpayment_proof}
                alt={ticket.full_name}
                style={{ width: "400px", height: "auto" }}
              />
            </div>
            <div className="">
              <div class="w-full max-w-xs">
                <label
                  for="decision"
                  class="block text-sm font-medium text-gray-700"
                >
                  Change Status
                </label>
                <select
                  id="decision"
                  name="decision"
                  value={decision}
                  onChange={handleChange}
                  class="mt-1 block border w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value=""  disabled>
                    Choose ..
                  </option>
                  <option value="ACCEPT">Accept</option>
                  <option value="REJECT">Reject</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};

export default TicketDetails;
