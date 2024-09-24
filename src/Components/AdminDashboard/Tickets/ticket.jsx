import axios from 'axios';
import React, { useEffect, useState } from 'react';


const Ticket = () => {

    const [count, setCount] = useState();
  const [renserApp, setRendder] = useState(false);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/getCount");
      // console.log(response.data);
      setCount(response.data.data.results_count);
      setRendder(true)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => loadData(), []);
  return (
    <div className="admin-dashboard">
     aaaa
    </div>
  );
};

export default Ticket;