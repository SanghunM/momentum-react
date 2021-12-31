import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import MomentumPage from "./pages/momentumPage";

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<MomentumPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }
}

export default App;
