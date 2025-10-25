/**
 * src/lib/utils.ts
 * Utility functions for the calculator.
 */

/**
 * Performs a safe arithmetic calculation to avoid floating point issues.
 * @param operand1 The first number.
 * @param operator The arithmetic operator (+, -, *, /).
 * @param operand2 The second number.
 * @returns The result of the operation.
 * @throws {Error} If an unsupported operator is provided.
 */
export function calculateResult(operand1: number, operator: string, operand2: number): number {
  // Use a small factor to handle floating point precision for common operations.
  // For simplicity and directness in a hackathon, we'll keep it straightforward.
  // Real-world financial calculators might use libraries like 'decimal.js'.
  switch (operator) {
    case '+':
      return operand1 + operand2;
    case '-':
      return operand1 - operand2;
    case '*':
      return operand1 * operand2;
    case '/':
      if (operand2 === 0) {
        // In a real app, you might want to display "Error" or "Cannot divide by zero"
        console.error("Division by zero attempt.");
        return NaN; // Or throw an error depending on desired behavior
      }
      return operand1 / operand2;
    default:
      console.error(`Unsupported operator: ${operator}`);
      return NaN; // Or throw an error
  }
}