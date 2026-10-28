#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/), modulo (%), power (**), and square root (sqrt).
function modulo(leftOperand, rightOperand) {
  if (rightOperand === 0) {
    throw new Error('Modulo by zero is not allowed.');
  }

  return leftOperand % rightOperand;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(value) {
  if (value < 0) {
    throw new Error('Cannot calculate the square root of a negative number.');
  }

  return Math.sqrt(value);
}

function calculate(leftOperand, operator, rightOperand) {
  switch (operator) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      if (rightOperand === 0) {
        throw new Error('Division by zero is not allowed.');
      }

      return leftOperand / rightOperand;
    case '%':
      return modulo(leftOperand, rightOperand);
    case '**':
      return power(leftOperand, rightOperand);
    case 'sqrt':
      return squareRoot(leftOperand);
    default:
      throw new Error(`Unsupported operation: ${operator}`);
  }
}

function parseOperand(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Invalid number: ${value}`);
  }

  const operand = Number(value);

  if (!Number.isFinite(operand)) {
    throw new Error(`Invalid number: ${value}`);
  }

  return operand;
}

function run(argumentsList) {
  if (argumentsList[0] === 'sqrt') {
    if (argumentsList.length !== 2) {
      throw new Error('Usage: node src/calculator.js sqrt <number>');
    }

    console.log(squareRoot(parseOperand(argumentsList[1])));
    return;
  }

  const [leftValue, operator, rightValue] = argumentsList;

  if (argumentsList.length !== 3) {
    throw new Error('Usage: node src/calculator.js <number> <+|-|*|/|%|**> <number>');
  }

  const result = calculate(parseOperand(leftValue), operator, parseOperand(rightValue));
  console.log(result);
}

if (require.main === module) {
  try {
    run(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = { calculate, modulo, parseOperand, power, run, squareRoot };
