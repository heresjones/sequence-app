import React, { useRef, useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const SierpinskiTriangle: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(0.5);
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

    const drawTriangle = (
      x: number,
      y: number,
      size: number,
      depth: number
    ) => {
      if (depth === 0) {
        ctx.beginPath();
        ctx.moveTo(x, height - y);
        ctx.lineTo(x + size / 2, height - (y + (size * Math.sqrt(3)) / 2));
        ctx.lineTo(x + size, height - y);
        ctx.closePath();
        ctx.stroke();
      } else {
        const newSize = size / 2;
        drawTriangle(x, y, newSize, depth - 1);
        drawTriangle(x + newSize, y, newSize, depth - 1);
        drawTriangle(
          x + newSize / 2,
          y + (newSize * Math.sqrt(3)) / 2,
          newSize,
          depth - 1
        );
      }
    };

    drawTriangle(
      (width - zoom * width) / 2 + offsetX,
      (height - zoom * height) / 2 + offsetY,
      zoom * width,
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
    setZoom(0.5);
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
    } else if (value > 10) {
      value = 10; // maximum value
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
      <Typography variant="h2">Sierpinski Triangle</Typography>
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

export default SierpinskiTriangle;
