'use client';

import { useState } from 'react';
import { calculateResult } from '@/src/lib/utils'; // Import utility for calculation

export default function Home() {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearCalculator = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculateResult(firstOperand!, operator, inputValue);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (firstOperand === null || operator === null || waitingForSecondOperand) {
      return;
    }

    const secondOperand = parseFloat(displayValue);
    const result = calculateResult(firstOperand, operator, secondOperand);

    setDisplayValue(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const handlePercentage = () => {
    const currentValue = parseFloat(displayValue);
    if (!isNaN(currentValue)) {
      setDisplayValue(String(currentValue / 100));
    }
  };

  const handleToggleSign = () => {
    const currentValue = parseFloat(displayValue);
    if (!isNaN(currentValue)) {
      setDisplayValue(String(currentValue * -1));
    }
  };

  const Button = ({ children, onClick, className = '' }: { children: React.ReactNode; onClick: () => void; className?: string }) => (
    <button
      onClick={onClick}
      className={`p-4 text-2xl font-semibold rounded-lg shadow-md transition-all duration-200 ease-in-out
                  bg-button-bg text-text-light hover:bg-button-hover active:scale-95
                  ${className}`}
    >
      {children}
    </button>
  );

  const OperatorButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <Button onClick={onClick} className="bg-operator-bg hover:bg-operator-hover">
      {children}
    </Button>
  );

  const ClearButton = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
    <Button onClick={onClick} className="bg-clear-bg hover:bg-clear-hover">
      {children}
    </Button>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-sm p-6 rounded-xl shadow-2xl bg-calculator-bg">
        <div className="h-20 mb-4 text-right text-text-light text-5xl font-light overflow-hidden bg-display-bg rounded-lg flex items-center justify-end px-4">
          {displayValue}
        </div>
        <div className="grid grid-cols-4 gap-3">
          <ClearButton onClick={clearCalculator} className="col-span-2">C</ClearButton>
          <Button onClick={handleToggleSign}>+/-</Button>
          <OperatorButton onClick={() => handleOperator('/')}>&divide;</OperatorButton>

          <Button onClick={() => inputDigit('7')}>7</Button>
          <Button onClick={() => inputDigit('8')}>8</Button>
          <Button onClick={() => inputDigit('9')}>9</Button>
          <OperatorButton onClick={() => handleOperator('*')}>&times;</OperatorButton>

          <Button onClick={() => inputDigit('4')}>4</Button>
          <Button onClick={() => inputDigit('5')}>5</Button>
          <Button onClick={() => inputDigit('6')}>6</Button>
          <OperatorButton onClick={() => handleOperator('-')}>-</OperatorButton>

          <Button onClick={() => inputDigit('1')}>1</Button>
          <Button onClick={() => inputDigit('2')}>2</Button>
          <Button onClick={() => inputDigit('3')}>3</Button>
          <OperatorButton onClick={() => handleOperator('+')}>+</OperatorButton>

          <Button onClick={() => inputDigit('0')} className="col-span-2">0</Button>
          <Button onClick={inputDecimal}>.</Button>
          <OperatorButton onClick={handleEquals}>=</OperatorButton>
        </div>
      </div>
    </div>
  );
}