import React from "react";
import Error from "../assets/Error.svg";

const Error404 = () => {
  return (
    <div className='Error-container'>
      <img src={Error} alt='Error' className='Error-image' />
    </div>
  );
};

export default Error404;
