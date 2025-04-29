import { checkNumberPadding } from './index';

describe('checkNumberPadding', () => {
    test('should return 0 for empty input', () => {
        expect(checkNumberPadding([])).toBe(0);
    });

    test('should return 3 for consistently padded numbers', () => {
        expect(checkNumberPadding(['001', '002'])).toBe(3);
        expect(checkNumberPadding(['001', '002', '9999'])).toBe(3);
    });

    test('should return 1 for unpadded numbers', () => {
        expect(checkNumberPadding(['1', '2', '999'])).toBe(1);
    });

    test('should return -3 for inconclusive padding with length 3', () => {
        expect(checkNumberPadding(['999', '9999'])).toBe(-3);
    });

    test('should return -4 for inconclusive padding with length 4', () => {
        expect(checkNumberPadding(['9999', '99999'])).toBe(-4);
    });


    test('should return -2 for inconclusive padding with length 2', () => {
        expect(checkNumberPadding(['99', '999', '9999'])).toBe(-2);
    });

    test('should return -1 for inconsistent padding', () => {
        expect(checkNumberPadding(['01', '002'])).toBe(-1);
    });

    test('should handle single number input', () => {
        expect(checkNumberPadding(['001'])).toBe(3);
        expect(checkNumberPadding(['1'])).toBe(1);
    });

    test('should handle large numbers', () => {
        expect(checkNumberPadding(['0001', '0002', '9999'])).toBe(4);
    });

    test('should handle mixed cases', () => {
        expect(checkNumberPadding(['1', '01', '001'])).toBe(-1);
    });
}); 