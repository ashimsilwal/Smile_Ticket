import React from 'react';
import './Programs.css';
import face_det from '../../Assets/Face-Detection.jpg'
import face_sec from '../../Assets/Face-Detection.jpg'
import face_repo from '../../Assets/Face-Detection.jpg'
import { IoTicket } from "react-icons/io5";

const Programs = () => {
  return (
    <div className="programs" id='programs'>
      <div className="program">
        <img
          src={face_det}
          alt="Liveness Detection"
        />
        <div className="caption">
          <IoTicket size={60} /> 
          <p>1 Month Bus fare Package</p>
        </div>
      </div>

      <div className="program">
        <img
          src={face_sec}
          alt="Real-time Attendance"
        />
        <div className="caption">
          <IoTicket size={60} />
          <p>3 Months Bus fare Package</p>
        </div>
      </div>

      <div className="program">
        <img
          src={face_repo}
          alt="Detailed Reporting"
        />
        <div className="caption">
          <IoTicket size={60} />
          <p>6 Months Bus Fare Package</p>
        </div>
      </div>
    </div>
  );
};

export default Programs;