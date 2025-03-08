import React from 'react';
import { useState } from 'react';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { toHindi, toEnglish, hindiOperators } from '../utils/hindiNumbers';

const CalcButton = styled(Button)(({ theme }) => ({
  fontSize: '1.5rem',
  padding: theme.spacing(2),
  margin: theme.spacing(0.5),
  minWidth: '64px',
  backgroundColor: '#f0f0f0',
  color: '#333',
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  '&.operator': {
    backgroundColor: '#ff9800',
    color: 'white',
    '&:hover': {
      backgroundColor: '#f57c00',
    },
  },
}));

const Display = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  textAlign: 'right',
  backgroundColor: '#f8f9fa',
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export default function Calculator() {
  const [display, setDisplay] = useState('०');
  const [firstNumber, setFirstNumber] = useState('');
  const [operation, setOperation] = useState('');
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(toHindi(num));
      setNewNumber(false);
    } else {
      if (display === '०') {
        setDisplay(toHindi(num));
      } else {
        setDisplay(display + toHindi(num));
      }
    }
  };

  const handleOperator = (op: string) => {
    const currentNumber = toEnglish(display);
    
    if (op === 'C') {
      setDisplay('०');
      setFirstNumber('');
      setOperation('');
      setNewNumber(true);
      return;
    }

    if (op === '=') {
      if (operation && firstNumber) {
        const num1 = parseFloat(firstNumber);
        const num2 = parseFloat(currentNumber);
        let result = 0;

        switch (operation) {
          case '+':
            result = num1 + num2;
            break;
          case '-':
            result = num1 - num2;
            break;
          case '×':
            result = num1 * num2;
            break;
          case '÷':
            result = num1 / num2;
            break;
        }

        setDisplay(toHindi(result.toString()));
        setFirstNumber('');
        setOperation('');
      }
    } else {
      setFirstNumber(currentNumber);
      setOperation(op);
      setNewNumber(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 4 }}>
        <Display elevation={3}>
          <Typography variant="h3" component="div">
            {display}
          </Typography>
          {operation && (
            <Typography variant="subtitle1" color="text.secondary">
              {toHindi(firstNumber)} {hindiOperators[operation]}
            </Typography>
          )}
        </Display>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
          <CalcButton onClick={() => handleOperator('C')}>C</CalcButton>
          <CalcButton className="operator" onClick={() => handleOperator('÷')}>÷</CalcButton>
          <CalcButton className="operator" onClick={() => handleOperator('×')}>×</CalcButton>
          <CalcButton className="operator" onClick={() => handleOperator('-')}>-</CalcButton>

          {[7, 8, 9].map((num) => (
            <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
              {toHindi(num.toString())}
            </CalcButton>
          ))}
          <CalcButton className="operator" onClick={() => handleOperator('+')}>+</CalcButton>

          {[4, 5, 6].map((num) => (
            <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
              {toHindi(num.toString())}
            </CalcButton>
          ))}
          <CalcButton className="operator" onClick={() => handleOperator('=')}>=</CalcButton>

          {[1, 2, 3].map((num) => (
            <CalcButton key={num} onClick={() => handleNumber(num.toString())}>
              {toHindi(num.toString())}
            </CalcButton>
          ))}
          <CalcButton
            onClick={() => handleNumber('0')}
            sx={{ gridColumn: 'span 2' }}
          >
            {toHindi('0')}
          </CalcButton>
          <CalcButton onClick={() => handleNumber('.')}>.</CalcButton>
        </Box>
      </Box>
    </Container>
  );
} 