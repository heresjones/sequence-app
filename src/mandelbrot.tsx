import React, { useRef, useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const MandelbrotSet: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [iterations, setIterations] = useState(1000);
  const [inputIterations, setInputIterations] = useState(iterations);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const i = (y * width + x) * 4;

        const m = mandelbrot(
          (x - width / 2) / (0.5 * zoom * width) + offsetX,
          (y - height / 2) / (0.5 * zoom * height) + offsetY,
          iterations
        );
        const hue = (m * 30) % 360;

        const [r, g, b] = m < 1 ? hsvToRgb(hue, 1, 1) : [0, 0, 0];
        data[i] = r;
        data[i + 1] = g;
        data[i + 2] = b;
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    const x = event.clientX - (rect?.left || 0);
    const y = event.clientY - (rect?.top || 0);
    setOffsetX((x - 800 / 2) / (0.5 * zoom * 800) + offsetX);
    setOffsetY((y - 600 / 2) / (0.5 * zoom * 600) + offsetY);
    setZoom(zoom * 1.2);
  };

  const handleReset = () => {
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  const handleIterationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = parseInt(event.target.value, 10);
    if (isNaN(value)) {
      value = 1000; // default value
    } else if (value < 100) {
      value = 100; // minimum value
    } else if (value > 5000) {
      value = 5000; // maximum value
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
      <Typography variant="h2">Mandelbrot Set</Typography>
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

function mandelbrot(x: number, y: number, maxIter: number = 1000): number {
  let real = x;
  let imag = y;
  for (var i = 0; i < maxIter; i++) {
    const tempReal = real * real - imag * imag + x;
    const tempImag = 2 * real * imag + y;
    real = tempReal;
    imag = tempImag;
    if (real * real + imag * imag > 4) return i / maxIter;
  }
  return 1;
}

function hsvToRgb(h: number, s: number, v: number): [number, number, number] {
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s) * 255;
  const q = v * (1 - f * s) * 255;
  const t = v * (1 - (1 - f) * s) * 255;
  v *= 255;
  switch (i % 6) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
    default:
      return [0, 0, 0];
  }
}
export default MandelbrotSet;
