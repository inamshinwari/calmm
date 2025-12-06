import React, { useState, useEffect, useCallback } from 'react';
import Display from './Display';
import Button from './Button';
import { BUTTON_LAYOUT } from '../constants';
import { evaluateExpression } from '../utils/math';

const Calculator: React.FC = () => {
  const [expression, setExpression] = useState<string>('');
  const [displayResult, setDisplayResult] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);

  // Core logic to handle inputs
  const handlePress = useCallback((val: string) => {
    if (val === 'AC') {
      setExpression('');
      setDisplayResult('');
      setIsDone(false);
      return;
    }

    if (val === 'DEL') {
      if (isDone) {
        setExpression('');
        setIsDone(false);
        return;
      }
      setExpression(prev => prev.slice(0, -1));
      return;
    }

    if (val === '=') {
      if (!expression) return;
      const result = evaluateExpression(expression);
      setExpression(result);
      setDisplayResult(''); // Clear result preview as main display takes over
      setIsDone(true);
      return;
    }

    // Operator handling
    if (['+', '-', '*', '/', '%'].includes(val)) {
      if (isDone) {
        // Continue with previous result
        setIsDone(false);
      }
      setExpression(prev => {
        // Prevent starting with operator (except minus for negative)
        if (prev === '' && val !== '-') return prev;
        
        // Prevent multiple operators (replace last)
        const lastChar = prev.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
          // Allow negative after operator (e.g. 5 * -2)
          if (val === '-' && lastChar !== '-') {
             return prev + val;
          }
          // If trying to add another operator and last was -, check if char before that was operator
          if (lastChar === '-') {
             const charBeforeLast = prev.slice(-2, -1);
             if (['+', '*', '/', '%'].includes(charBeforeLast)) {
                // Replacing the operator chain
                return prev.slice(0, -2) + val;
             }
          }
          return prev.slice(0, -1) + val;
        }
        return prev + val;
      });
      return;
    }

    // Number/Decimal handling
    if (isDone) {
      setExpression(val);
      setIsDone(false);
    } else {
      setExpression(prev => {
        // Prevent multiple decimals in one number block
        if (val === '.') {
          const split = prev.split(/[+\-*/%]/);
          const currentNum = split[split.length - 1];
          if (currentNum.includes('.')) return prev;
        }
        return prev + val;
      });
    }
  }, [expression, isDone]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      if (/[0-9]/.test(key)) handlePress(key);
      if (['+', '-', '*', '/', '%', '.'].includes(key)) handlePress(key);
      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handlePress('=');
      }
      if (key === 'Backspace') handlePress('DEL');
      if (key === 'Escape') handlePress('AC');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePress]);

  // Real-time calculation preview (optional, but adds nice UX)
  useEffect(() => {
     if (!expression || isDone) {
         if (isDone) setDisplayResult(''); // Cleared in handlePress, but safe here
         return;
     }
     
     // Only preview if it's a valid expression end (number)
     // and contains at least one operator to be worth calculating
     const lastChar = expression.slice(-1);
     if (!['+', '-', '*', '/', '%'].includes(lastChar)) {
        // Check if there is an operator
        if (/[+\-*/%]/.test(expression)) {
            const tempRes = evaluateExpression(expression);
            if (tempRes !== "Error" && tempRes !== expression) {
                setDisplayResult(tempRes);
            } else {
                setDisplayResult('');
            }
        } else {
            setDisplayResult('');
        }
     }
  }, [expression, isDone]);

  return (
    <div className="flex flex-col w-full max-w-md h-full sm:h-auto sm:aspect-[9/16] bg-gray-100 sm:bg-white sm:rounded-[3rem] sm:shadow-2xl overflow-hidden relative">
      {/* Display Section */}
      <div className="flex-1 flex flex-col justify-end bg-transparent z-10 relative">
        <Display expression={expression} result={isDone ? '' : displayResult} />
      </div>

      {/* Keypad Section */}
      <div className="bg-gray-100 sm:bg-white p-5 pb-8 sm:p-6 sm:pb-8 grid grid-cols-4 gap-3 sm:gap-4 z-20 rounded-t-3xl">
        {BUTTON_LAYOUT.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {row.map((btn) => (
              <Button
                key={btn.value}
                data={btn}
                onClick={handlePress}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
