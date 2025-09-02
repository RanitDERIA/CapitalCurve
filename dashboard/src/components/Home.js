// src/components/Home.jsx
import React from "react";
import TopBar from "./TopBar";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="home-container">
        <h2>Welcome to the Trading Dashboard</h2>
        <p>Select "Dashboard" from the menu to view your portfolio, orders, holdings, and more.</p>
      </div>
    </>
  );
};

export default Home;
