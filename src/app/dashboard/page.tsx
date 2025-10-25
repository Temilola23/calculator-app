

I'll create a calculator dashboard page with a clean, modern design using shadcn/ui components.

```tsx file="app/dashboard/page.tsx"
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Delete, Divide, Minus, Plus, X, Equal } from 'lucide-react'

export default function Dashboard() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const backspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      if (newValue === null) {
        setDisplay('Error')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
        return
      }

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number | null => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        return secondValue !== 0 ? firstValue / secondValue : null
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      
      if (newValue === null) {
        setDisplay('Error')
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
        return
      }

      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const buttonClass = "h-14 text-lg font-semibold"
  const numberButtonClass = `${buttonClass} bg-background hover:bg-muted`
  const operatorButtonClass = `${buttonClass} bg-primary hover:bg-primary/90 text-primary-foreground`
  const specialButtonClass = `${buttonClass} bg-muted hover:bg-muted/80`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-md mx-auto pt-8">
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-center text-slate-800">
              Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Display */}
            <div className="bg-slate-900 rounded-lg p-4 text-right">
              <div className="text-3xl font-mono text-white min-h-[2.5rem] flex items-center justify-end overflow-hidden">
                {display}
              </div>
            </div>

            {/* Button Grid */}
            <div className="grid grid-cols-4 gap-3">
              {/* Row 1 */}
              <Button
                onClick={clear}
                className={`${specialButtonClass} col-span-2`}
                variant="secondary"
              >
                Clear
              </Button>
              <Button
                onClick={backspace}
                className={specialButtonClass}
                variant="secondary"
              >
                <Delete className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => performOperation('/')}
                className={operatorButtonClass}
              >
                <Divide className="h-5 w-5" />
              </Button>

              {/* Row 2 */}
              <Button
                onClick={() => inputNumber('7')}
                className={numberButtonClass}
                variant="outline"
              >
                7
              </Button>
              <Button
                onClick={() => inputNumber('8')}
                className={numberButtonClass}
                variant="outline"
              >
                8
              </Button>
              <Button
                onClick={() => inputNumber('9')}
                className={numberButtonClass}
                variant="outline"
              >
                9
              </Button>
              <Button
                onClick={() => performOperation('*')}
                className={operatorButtonClass}
              >
                <X className="h-5 w-5" />
              </Button>

              {/* Row 3 */}
              <Button
                onClick={() => inputNumber('4')}
                className={numberButtonClass}
                variant="outline"
              >
                4
              </Button>
              <Button
                onClick={() => inputNumber('5')}
                className={numberButtonClass}
                variant="outline"
              >
                5
              </Button>
              <Button
                onClick={() => inputNumber('6')}
                className={numberButtonClass}
                variant="outline"
              >
                6
              </Button>
              <Button
                onClick={() => performOperation('-')}
                className={operatorButtonClass}
              >
                <Minus className="h-5 w-5" />
              </Button>

              {/* Row 4 */}
              <Button
                onClick={() => inputNumber('1')}
                className={numberButtonClass}
                variant="outline"
              >
                1
              </Button>
              <Button
                onClick={() => inputNumber('2')}
                className={numberButtonClass}
                variant="outline"
              >
                2
              </Button>
              <Button
                onClick={() => inputNumber('3')}
                className={numberButtonClass}
                variant="outline"
              >
                3
              </Button>
              <Button
                onClick={() => performOperation('+')}
                className={operatorButtonClass}
              >
                <Plus className="h-5 w-5" />
              </Button>

              {/* Row 5 */}
              <Button
                onClick={() => inputNumber('0')}
                className={`${numberButtonClass} col-span-2`}
                variant="outline"
              >
                0
              </Button>
              <Button
                onClick={inputDecimal}
                className={numberButtonClass}
                variant="outline"
              >
                .
              </Button>
              <Button
                onClick={handleEquals}
                className={`${buttonClass} bg-green-600 hover:bg-green-700 text-white`}
              >
                <Equal className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-slate-600">
          <p>Use the calculator for basic arithmetic operations</p>
        </div>
      </div>
    </div>
  )
}
```

This calculator dashboard includes:

**Features:**
- ✅ Basic arithmetic operations (+, -, ×, ÷)
- ✅ Decimal number support
- ✅ Clear and backspace functionality
- ✅ Error handling for division by zero
- ✅ Responsive design
- ✅ Modern UI with gradient background

**Components Used:**
- `Card` and `CardContent` from shadcn/ui for the calculator container
- `Button` components with different variants for different button types
- Lucide icons: `Delete`, `Divide`, `Minus`, `Plus`, `X`, `Equal`

**Design:**
- Clean, modern interface with a dark display screen
- Color-coded buttons (numbers, operators, special functions)
- Responsive grid layout
- Subtle animations and hover effects
- Professional gradient background

The calculator handles all standard calculator operations and provides visual feedback for different button types. The state management ensures proper calculation flow and error handling.