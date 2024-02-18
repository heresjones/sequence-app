import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Exponents = () => {
  const [n, setN] = useState(2);
  const [exponent, setExponent] = useState(4);
  const [results, setResults] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const newResults = [];
    for (let i = 0; i <= exponent; i++) {
      newResults.push(Math.pow(n, i));
    }
    setResults(newResults);
    setLoading(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2">Exponents</Typography>
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
          label="N"
          type="number"
          value={n}
          onChange={(e: { target: { value: any } }) =>
            setN(Number(e.target.value))
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Exponent"
          type="number"
          value={exponent}
          onChange={(e: { target: { value: any } }) =>
            setExponent(Number(e.target.value))
          }
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Calculate Exponents"}
        </Button>
      </Box>
      <Box
        sx={{
          p: 2,
          maxWidth: "60ch",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((result, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{result.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Exponents;
