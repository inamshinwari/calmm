/**
 * Safe floating point addition
 */
const add = (a: number, b: number) => {
  return Number((a + b).toFixed(10));
};

/**
 * Safe floating point subtraction
 */
const sub = (a: number, b: number) => {
  return Number((a - b).toFixed(10));
};

/**
 * Safe floating point multiplication
 */
const mul = (a: number, b: number) => {
  return Number((a * b).toFixed(10));
};

/**
 * Safe floating point division
 */
const div = (a: number, b: number) => {
  if (b === 0) throw new Error("Cannot divide by zero");
  return Number((a / b).toFixed(10));
};

/**
 * Modulo operation
 */
const mod = (a: number, b: number) => {
    return Number((a % b).toFixed(10));
}

/**
 * Tokenizes a mathematical expression string into numbers and operators
 */
const tokenize = (expression: string): (string | number)[] => {
  const tokens: (string | number)[] = [];
  let currentNumber = "";

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (/[0-9.]/.test(char)) {
      currentNumber += char;
    } else if (['+', '-', '*', '/', '%'].includes(char)) {
      if (currentNumber !== "") {
        tokens.push(parseFloat(currentNumber));
        currentNumber = "";
      }
      // Handle negative numbers at start or after operator
      if (char === '-' && (tokens.length === 0 || typeof tokens[tokens.length - 1] === 'string')) {
          currentNumber += '-';
      } else {
          tokens.push(char);
      }
    }
  }

  if (currentNumber !== "") {
    tokens.push(parseFloat(currentNumber));
  }

  return tokens;
};

/**
 * Evaluates a mathematical expression string using Order of Operations (PEMDAS equivalent)
 * without using dangerous eval()
 */
export const evaluateExpression = (expression: string): string => {
  if (!expression) return "";

  try {
    const tokens = tokenize(expression);

    if (tokens.length === 0) return "";

    // First pass: Multiplication, Division, Modulo
    const stack1: (string | number)[] = [];
    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      if (token === '*' || token === '/' || token === '%') {
        const prev = stack1.pop();
        const next = tokens[i + 1];

        if (typeof prev !== 'number' || typeof next !== 'number') {
           // Malformed expression trailing operator
           if (typeof prev === 'number') stack1.push(prev); // put it back
           i++;
           continue; 
        }

        let res = 0;
        if (token === '*') res = mul(prev, next);
        if (token === '/') res = div(prev, next);
        if (token === '%') res = mod(prev, next);

        stack1.push(res);
        i += 2;
      } else {
        stack1.push(token);
        i++;
      }
    }

    // Second pass: Addition, Subtraction
    let result = typeof stack1[0] === 'number' ? stack1[0] : 0;
    
    // If expression started with operator (technically handled in tokenize but strictly checking here)
    // In our tokenize logic, we handle negative starts. 
    // If stack1 starts with operator other than -, it's invalid, but let's assume valid sanitized inputs.

    for (let j = 1; j < stack1.length; j += 2) {
      const operator = stack1[j];
      const nextVal = stack1[j + 1];

      if (typeof nextVal !== 'number') continue;

      if (operator === '+') result = add(result, nextVal);
      if (operator === '-') result = sub(result, nextVal);
    }

    if (isNaN(result) || !isFinite(result)) return "Error";
    
    return result.toString();
  } catch (e) {
    return "Error";
  }
};
