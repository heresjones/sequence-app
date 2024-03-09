import React from "react";
import {
  HashRouter as Router,
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
import MandelbrotSet from "./mandelbrot";
import SierpinskiTriangle from "./sierpinskitriangle";
import LevyCCurve from "./levyccurve";

function App() {
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        {/* <Counting /> */}
        <Container maxWidth="lg" disableGutters={true}>
          <Routes>
            <Route path="/index" element={<HomePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/counting" element={<Counting />} />
            <Route path="/digitsofpi" element={<DigitsOfPi />} />
            <Route path="/fibonacci" element={<Fibonacci />} />
            <Route path="/primenumbers" element={<PrimeNumbers />} />
            <Route path="/exponents" element={<Exponents />} />
            <Route path="/mandelbrotset" element={<MandelbrotSet />} />
            <Route
              path="/sierpinskitriangle"
              element={<SierpinskiTriangle />}
            />
            <Route path="/levyccurve" element={<LevyCCurve />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
