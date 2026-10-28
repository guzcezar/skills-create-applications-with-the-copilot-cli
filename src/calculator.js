#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), and division (/).
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
  const [leftValue, operator, rightValue] = argumentsList;

  if (argumentsList.length !== 3) {
    throw new Error('Usage: node src/calculator.js <number> <+|-|*|/> <number>');
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

module.exports = { calculate, parseOperand, run };
