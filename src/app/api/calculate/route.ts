import { NextResponse } from 'next/server';
import { calculateResult } from '@/src/lib/utils'; // Re-use the utility function

/**
 * src/app/api/calculate/route.ts
 * API route for performing a single arithmetic calculation.
 * This route demonstrates backend logic, although the primary calculator UI
 * operates client-side for responsiveness.
 */
export async function POST(request: Request) {
  try {
    const { operand1, operator, operand2 } = await request.json();

    // Validate inputs
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number' || typeof operator !== 'string') {
      return NextResponse.json({ error: 'Invalid input: operand1, operator, and operand2 are required and must be valid types.' }, { status: 400 });
    }

    const validOperators = ['+', '-', '*', '/'];
    if (!validOperators.includes(operator)) {
      return NextResponse.json({ error: `Invalid operator: ${operator}. Supported operators are +, -, *, /.` }, { status: 400 });
    }

    if (operator === '/' && operand2 === 0) {
      return NextResponse.json({ error: 'Division by zero is not allowed.' }, { status: 400 });
    }

    const result = calculateResult(operand1, operator, operand2);

    // Check for NaN result from utility (e.g., if unsupported operator was somehow passed despite check)
    if (isNaN(result)) {
        return NextResponse.json({ error: 'Calculation resulted in an invalid number.' }, { status: 500 });
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error('API calculation error:', error);
    return NextResponse.json({ error: error.message || 'An unexpected error occurred during calculation.' }, { status: 500 });
  }
}