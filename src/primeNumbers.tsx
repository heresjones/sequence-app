import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";

const PrimeNumbers = () => {
  const [n, setN] = useState(0);
  const [primes, setPrimes] = useState<number[]>([]);
  const [highlightTwinPrimes, setHighlightTwinPrimes] = useState(false);
  const [onlyTwinPrimes, setOnlyTwinPrimes] = useState(false);
  const [loading, setLoading] = useState(false);

  const isPrime = (num: number): boolean => {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
      if (num % i === 0) return false;
    return num > 1;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const newPrimes = [];
    let num = 2;
    while (newPrimes.length < n) {
      if (isPrime(num)) {
        newPrimes.push(num);
      }
      num++;
    }
    setPrimes(newPrimes);
    setLoading(false);
  };

  const isTwinPrime = (index: number) => {
    return (
      primes[index] - primes[index - 1] === 2 ||
      primes[index + 1] - primes[index] === 2
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h2">Prime Numbers</Typography>
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
            setN(Math.min(10000, Number(e.target.value)))
          }
          fullWidth
          margin="normal"
          helperText="Enter a number up to 10,000"
        />
        <FormControlLabel
          control={
            <Switch
              checked={highlightTwinPrimes}
              onChange={(e: {
                target: {
                  checked: boolean | ((prevState: boolean) => boolean);
                };
              }) => setHighlightTwinPrimes(e.target.checked)}
            />
          }
          label="Highlight twin primes"
        />
        <FormControlLabel
          control={
            <Switch
              checked={onlyTwinPrimes}
              onChange={(e: {
                target: {
                  checked: boolean | ((prevState: boolean) => boolean);
                };
              }) => setOnlyTwinPrimes(e.target.checked)}
            />
          }
          label="Show only twin primes"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Primes"}
        </Button>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {primes
            .filter((prime, index) => !onlyTwinPrimes || isTwinPrime(index))
            .map((prime, index) => (
              <span
                key={index}
                style={{
                  fontWeight:
                    highlightTwinPrimes && isTwinPrime(index)
                      ? "bold"
                      : "normal",
                }}
              >
                {prime}
                {index < primes.length - 1 ? ", " : ""}
              </span>
            ))}
        </Typography>
      </Box>
    </Box>
  );
};

export default PrimeNumbers;
