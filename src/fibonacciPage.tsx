import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Fibonacci = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [range, setRange] = useState<number[]>([]);

  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    let a = 0;
    let b = 1;

    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }

    return b;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newRange = [];
    for (let i = start; i <= end; i++) {
      newRange.push(fibonacci(i));
    }
    setRange(newRange);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2">Fibonacci</Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: 2,
          maxWidth: "60ch",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left",
        }}
      >
        <TextField
          label="Start"
          type="number"
          value={start}
          onChange={(e: { target: { value: any } }) =>
            setStart(Number(e.target.value))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="End"
          type="number"
          value={end}
          onChange={(e: { target: { value: any } }) =>
            setEnd(Number(e.target.value))
          }
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Generate Range
        </Button>
        <TableContainer component={Paper} sx={{ maxHeight: 440, mt: 2 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Fibonacci Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {range.map((num, index) => (
                <TableRow key={index}>
                  <TableCell>{index + start}</TableCell>
                  <TableCell>{num}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Fibonacci;
