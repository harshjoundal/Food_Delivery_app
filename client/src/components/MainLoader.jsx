import React from 'react'
// import "../assets/css/Loader.css"
import { Spin } from "antd";

const MainLoader = () => {
  return (
    <div className="flex items-center justify-center container">
      <Spin size='large' tip="Loading..."/>
    </div>
  );
}

export default MainLoader