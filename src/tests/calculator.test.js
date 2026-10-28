const {
  calculate,
  modulo,
  parseOperand,
  power,
  run,
  squareRoot,
} = require('../calculator');

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

  test('performs modulo, power, and square root operations', () => {
    expect(calculate(20, '%', 6)).toBe(2);
    expect(calculate(2, '**', 3)).toBe(8);
    expect(calculate(9, 'sqrt')).toBe(3);
  });

  test('calculates negative and decimal operands', () => {
    expect(calculate(-2.5, '+', 0.5)).toBe(-2);
    expect(calculate(7.5, '/', 2.5)).toBe(3);
  });

  test('rejects division by zero', () => {
    expect(() => calculate(20, '/', 0)).toThrow('Division by zero is not allowed.');
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate(2, '^', 3)).toThrow('Unsupported operation: ^');
  });
});

describe('modulo', () => {
  test('returns the remainder after division', () => {
    expect(modulo(5, 2)).toBe(1);
    expect(modulo(20, 6)).toBe(2);
  });

  test('rejects a zero divisor', () => {
    expect(() => modulo(20, 0)).toThrow('Modulo by zero is not allowed.');
  });
});

describe('power', () => {
  test('raises a base to an exponent', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(5, 0)).toBe(1);
    expect(power(2, -3)).toBe(0.125);
  });
});

describe('squareRoot', () => {
  test('returns the square root of a non-negative number', () => {
    expect(squareRoot(16)).toBe(4);
    expect(squareRoot(9)).toBe(3);
    expect(squareRoot(0)).toBe(0);
  });

  test('rejects negative numbers', () => {
    expect(() => squareRoot(-1)).toThrow(
      'Cannot calculate the square root of a negative number.',
    );
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

  test('prints the square root result', () => {
    const log = jest.spyOn(console, 'log').mockImplementation();

    run(['sqrt', '9']);

    expect(log).toHaveBeenCalledWith(3);
    log.mockRestore();
  });

  test('requires exactly two operands and an operation', () => {
    expect(() => run(['2', '+'])).toThrow(
      'Usage: node src/calculator.js <number> <+|-|*|/|%|**> <number>',
    );
  });

  test('propagates invalid calculation errors', () => {
    expect(() => run(['20', '/', '0'])).toThrow('Division by zero is not allowed.');
    expect(() => run(['20', '%', '0'])).toThrow('Modulo by zero is not allowed.');
    expect(() => run(['sqrt', '-1'])).toThrow(
      'Cannot calculate the square root of a negative number.',
    );
    expect(() => run(['two', '+', '3'])).toThrow('Invalid number: two');
  });
});
