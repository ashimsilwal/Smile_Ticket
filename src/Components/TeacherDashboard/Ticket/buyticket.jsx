import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import qrcode from "../../../Assets/aaaaaaaa.jpeg";

const BuyTicket = () => {
  const [formData, setFormData] = useState({
    name: "",
    transaction_id: "",
    package: "",
    image: null,
  });
  const fileInputRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const [packages, setPackage] = useState();
  const [transaction_id, setTransactionId] = useState();
  const [image, setImage] = useState();
  const [renderapp, setRenderApp] = useState(false);
  const [ticketData, setTicketData] = useState();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    const mydata = new FormData();
    mydata.append("user_id", token);
    mydata.append("transaction_id", transaction_id);
    mydata.append("package", packages);
    mydata.append("image", image);
    // const formdata = {
    //   user_id: 3,
    //   transaction_id: transaction_id,
    //   package: packages,
    // };

    const response = await axios.post(
      `http://localhost:8080/api/v1/ticket`,
      mydata
    );
    if (response.status == 200) {
      console.log(response.data.insertedId);
      setTransactionId("");
      setPackage("");
      try {
        const response2 = await axios.get(
          `http://localhost:8080/api/v1/ticketbyid/${response.data.insertedId}`
        );
        setTicketData(response2.data.data);
        setRenderApp(true);
      } catch (error) {
        console.log(error);
      }
      // navigate("/customer");
    }
    console.log("Form submitted:", transaction_id, packages);
    // Here you would typically send the data to your server
  };
  return (
    <div className="justify-center items-center mx-auto mt-48 flex gap-9">
      <div className=" p-6 bg-white rounded-lg shadow-md">
        {renderapp && (
          <div>
            <div className="my-8 bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-[#4fa021] items-center flex justify-between text-white px-6 py-4">
                <h1 className="text-2xl font-bold">Bus Ticket</h1>
                <p className="font-bold">{ticketData.status}...</p>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Passenger</p>
                    <p className="text-lg font-semibold">
                      {ticketData.full_name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Ticket No.</p>
                    <p className="text-lg font-semibold">
                      {ticketData.ticket_number}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-semibold">
                      {" "}
                      {ticketData.end_date
                        ? new Date(ticketData.start_date).toLocaleDateString()
                        : "Invalid date"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-semibold">
                      {" "}
                      {ticketData.end_date
                        ? new Date(ticketData.end_date).toLocaleDateString()
                        : "Invalid date"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="">
          <div className="">
            <h2 className="text-2xl font-bold mb-6 text-center">Buy Tickets</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                {/* <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> */}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Transaction id
                </label>
                <input
                  type="text"
                  id="text"
                  name="text"
                  // value={formData.transaction_id}
                  onChange={(e) => setTransactionId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="package"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Ticket Package
                </label>
                <select
                  id="package"
                  name="package"
                  // value={formData.package}
                  onChange={(e) => setPackage(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Select a package</option>
                  <option value="1 Month">One Month Package -> Rs.1200</option>
                  <option value="3 Month">
                    Three Month Package -> Rs.3240
                  </option>
                  <option value="6 Month">Six Month Package -> Rs.6400</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Upload Payment Proof
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {image && (
                      <img
                        className="ml-4"
                        width="60"
                        height="60"
                        src={URL.createObjectURL(image)}
                      />
                    )}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-[#4fa021] hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Purchase Ticket
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="bg-white w-72">
        <img src={qrcode}  alt="qrcode" />
      <div className="px-4 py-5 pt-2">
        Pay on this QR Code and type the <span className="font-semibold text-lg text-red-600 underline">unique transaction id </span> 
        <br/>on the mentioned box The Transaction id will be your ticket number.
      </div>
      </div>
    </div>
  );
};

export default BuyTicket;
