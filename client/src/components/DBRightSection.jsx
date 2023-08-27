import React from "react";
import DBHeader from "./DBHeader";
import { Route, Routes } from "react-router-dom";
import DBHome from "./DBHome";
import BDOrders from "./BDOrders";
import DBItems from "./DBItems";
import DBNewItem from "./DBNewItem";
import DBUsers from "./DBUsers";

const DBRightSection = () => {
  return (
    <div className="flex flex-col py-12 flex-1 h-full px-12">
      <DBHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/home" element={<DBHome />} />
          <Route path="/orders" element={<BDOrders />} />
          <Route path="/items" element={<DBItems />} />
          <Route path="/newItem" element={<DBNewItem />} />
          <Route path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
