import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Counting from "./counting";
import ResponsiveAppBar from "./responsiveAppBar";
import { Container } from "@mui/material";
import DigitsOfPi from "./digitsofpi";
import Fibonacci from "./fibonacciPage";
import PrimeNumbers from "./primeNumbers";
import Exponents from "./exponents";
import HomePage from "./homepage";

function App() {
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        {/* <Counting /> */}
        <Container maxWidth="lg" disableGutters={true}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/counting" element={<Counting />} />
            <Route path="/digitsofpi" element={<DigitsOfPi />} />
            <Route path="/fibonacci" element={<Fibonacci />} />
            <Route path="/primenumbers" element={<PrimeNumbers />} />
            <Route path="/exponents" element={<Exponents />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
