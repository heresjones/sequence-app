import React, { useRef, useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const LevyCCurve: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(0.25);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [iterations, setIterations] = useState(5);
  const [inputIterations, setInputIterations] = useState(iterations);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const drawCurve = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      depth: number
    ) => {
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      } else {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const newX = 0.5 * (x1 + x2 + dy);
        const newY = 0.5 * (y1 + y2 - dx);
        drawCurve(x1, y1, newX, newY, depth - 1);
        drawCurve(newX, newY, x2, y2, depth - 1);
      }
    };

    drawCurve(
      (width - zoom * width) / 2 + offsetX,
      (height - zoom * height) / 2 + offsetY,
      (width + zoom * width) / 2 + offsetX,
      (height - zoom * height) / 2 + offsetY,
      iterations
    );
  };

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = event.clientX - (rect?.left || 0);
    const y = event.clientY - (rect?.top || 0);
    const newZoom = zoom * 1.2;
    setOffsetX(
      (x - 800 / 2) * (1 - newZoom / zoom) + (offsetX * newZoom) / zoom
    );
    setOffsetY(
      (y - 600 / 2) * (1 - newZoom / zoom) + (offsetY * newZoom) / zoom
    );
    setZoom(newZoom);
  };

  const handleReset = () => {
    setZoom(0.25);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleIterationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      value = 5; // default value
    } else if (value < 0) {
      value = 0; // minimum value
    } else if (value > 50) {
      value = 50; // maximum value
    }
    setInputIterations(value);
  };

  const handleIterationsSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIterations(inputIterations);
  };

  useEffect(() => {
    draw();
  }, [zoom, offsetX, offsetY, iterations]);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2">Levy C Curve</Typography>
      <Box
        component="form"
        onSubmit={handleIterationsSubmit}
        sx={{
          p: 2,
          maxWidth: "60ch",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left",
        }}
      >
        <TextField
          label="Iterations"
          type="number"
          value={inputIterations}
          onChange={handleIterationsChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={() => setZoom(zoom * 1.2)}>+</Button>
        <Button onClick={() => setZoom(zoom / 1.2)}>-</Button>
        <Button onClick={handleReset}>Reset</Button>
      </Box>
      <canvas ref={canvasRef} onClick={handleClick} width={800} height={600} />
    </Box>
  );
};

export default LevyCCurve;
