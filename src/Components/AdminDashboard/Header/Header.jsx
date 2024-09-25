import React, { useEffect, useState } from "react";
import "./Header.css";
import { FaBell, FaUserCircle } from "react-icons/fa"; // Import icons
import axios from "axios";

const Header = ({ head }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [renderApp, setRenderApp] = useState(false);
  const [userdata, setUserData] = useState();

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const loadData = async () => {
    try {
      var token = localStorage.getItem("token");

      const data = await axios.get(
        `http://localhost:8080/api/v1/getUserById/${token}`
      );
      setUserData(data.data.data);
      setRenderApp(true);
    } catch (error) {
      console.log("Error in customer", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <h2>{head}</h2>
      </div>
      <div className="header-right relative" onClick={handleDropdownToggle}>
        <FaUserCircle className="text-3xl cursor-pointer" />
        {isDropdownOpen && (
          <div className="absolute top-8 -right-5 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
            {renderApp ? (
              <ul className="flex flex-col overflow-hidden">
                <li className="py-2 w-full cursor-pointer">
                  {userdata.full_name}
                </li>
                <li className=" py-2 w-full cursor-pointer mr-2 ">
                {userdata.email}
                </li>
              </ul>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
