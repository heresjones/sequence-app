import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

const Counting = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  const [range, setRange] = useState<number[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newRange = [];
    for (let i = start; i <= end; i++) {
      newRange.push(i);
    }
    setRange(newRange);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2">Counting</Typography>
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
        <Typography variant="body1">{range.join(", ")}</Typography>
      </Box>
    </Box>
  );
};

export default Counting;
