import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Deals,
  Pizzas,
  Drinks,
  Signin,
  Login,
  Sellerform,Items,Additems,Placeorder,
  Cart,
  OrderPlaced,Dashboard
} from "./Routes";
import { Protectroute } from "./Helpers";
import User from "./Routes/User";


const App = () => {
  const loaderColors = [
    "bg-amber-300",
    "bg-red-300",
    "bg-green-300",
    "bg-blue-300",
    "bg-purple-300",
    "bg-pink-300",
  ];

  return (
    <div className="select-none">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/pizzas" element={<Pizzas />} />
        <Route path="/Drinks" element={<Drinks />} />
        <Route
          path="/User"
          element={
            <Protectroute>
              <User />
            </Protectroute>
          }
        />
         <Route
          path="/Dashboard"
          element={
            <Protectroute>
              <Dashboard />
            </Protectroute>
          }
        />
        <Route path="/signup" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/createseller"
          element={
            <Protectroute>
              <Sellerform />
            </Protectroute>
          }
        />
         <Route
          path="/cart"
          element={
            <Protectroute>
              <Cart />
            </Protectroute>
          }
        />
         <Route
          path="/Items"
          element={
            <Protectroute Seller={true}>
              <Items />
            </Protectroute>
          }
        />
         <Route
          path="/Place"
          element={
            <Protectroute >
              <Placeorder />
            </Protectroute>
          }
        />
          <Route
          path="/orders"
          element={
            <Protectroute >
              <OrderPlaced />
            </Protectroute>
          }
        />
         <Route
          path="/addItem"
          element={
            <Protectroute Seller={true}>
              <Additems />
            </Protectroute>
          }
        />
      
      </Routes>

      <div className="w-screen h-screen fixed flex top-0 pointer-events-none z-[100]">
        {Array(window.innerWidth < 500 ? 3 : 6)
          .fill()
          .map((_, i) => (
            <div
              key={i}
              className={`md:w-1/6 w-1/3 loader border-r-1 translate-y-[-100%] h-screen ${loaderColors[i]} pointer-events-auto z-100`}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default App;
