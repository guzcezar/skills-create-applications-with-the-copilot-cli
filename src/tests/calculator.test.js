const { calculate, parseOperand, run } = require('../calculator');

describe('calculate', () => {
  test('adds two numbers', () => {
    expect(calculate(2, '+', 3)).toBe(5);
  });

  test('subtracts two numbers', () => {
    expect(calculate(10, '-', 4)).toBe(6);
  });

  test('multiplies two numbers', () => {
    expect(calculate(45, '*', 2)).toBe(90);
  });

  test('divides two numbers', () => {
    expect(calculate(20, '/', 5)).toBe(4);
  });

  test('calculates negative and decimal operands', () => {
    expect(calculate(-2.5, '+', 0.5)).toBe(-2);
    expect(calculate(7.5, '/', 2.5)).toBe(3);
  });

  test('rejects division by zero', () => {
    expect(() => calculate(20, '/', 0)).toThrow('Division by zero is not allowed.');
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate(2, '%', 3)).toThrow('Unsupported operation: %');
  });
});

describe('parseOperand', () => {
  test('converts valid numeric strings to numbers', () => {
    expect(parseOperand('42')).toBe(42);
    expect(parseOperand('-3.5')).toBe(-3.5);
  });

  test.each(['', '   ', 'not-a-number', 'Infinity'])('rejects invalid operand %p', (value) => {
    expect(() => parseOperand(value)).toThrow(`Invalid number: ${value}`);
  });
});

describe('run', () => {
  test('prints the calculation result', () => {
    const log = jest.spyOn(console, 'log').mockImplementation();

    run(['2', '+', '3']);

    expect(log).toHaveBeenCalledWith(5);
    log.mockRestore();
  });

  test('requires exactly two operands and an operation', () => {
    expect(() => run(['2', '+'])).toThrow(
      'Usage: node src/calculator.js <number> <+|-|*|/> <number>',
    );
  });

  test('propagates invalid calculation errors', () => {
    expect(() => run(['20', '/', '0'])).toThrow('Division by zero is not allowed.');
    expect(() => run(['two', '+', '3'])).toThrow('Invalid number: two');
  });
});
