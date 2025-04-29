/**
 * Checks the consistency of number padding in a sequence of strings.
 * @param intStrs - An iterable of strings containing numbers
 * @returns A number indicating the padding status:
 *   - Positive number (>1): Consistent padding length
 *   - 1: No padding used
 *   - Negative number (<-1): Inconclusive padding
 *   - -1: Inconsistent padding
 *   - 0: No observations
 */
export function checkNumberPadding(intStrs: Iterable<string>): number {
    const strings = Array.from(intStrs);
    
    // Handle empty input
    if (strings.length === 0) {
        return 0;
    }

    // Convert strings to numbers and track their original lengths
    const numbers = strings.map(s => parseInt(s, 10));
    const lengths = strings.map(s => s.length);
    const minLength = Math.min(...lengths);

    // Find leading zeros for each string
    const leadingZeros = strings.map(s => {
        let count = 0;
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '0') count++;
            else break;
        }
        return count;
    });

    // Group strings by their value length (without leading zeros)
    const valueLengths = numbers.map(n => n.toString().length);
    const minValueLength = Math.min(...valueLengths);

    // Get the shortest numbers (by value length)
    const shortNumbers = strings.filter((_, i) => valueLengths[i] === minValueLength);
    const shortNumberLength = shortNumbers[0].length;

    // Check if we have consistent padding in short numbers
    const shortNumbersConsistent = shortNumbers.every(s => {
        return s.length === shortNumberLength && (s.length > minValueLength ? s.startsWith('0') : true);
    });

    if (shortNumbersConsistent && shortNumberLength > minValueLength) {
        // Check if longer numbers are valid overflow
        const longerNumbersValid = strings.every((s, i) => {
            if (valueLengths[i] === minValueLength) {
                return s.length === shortNumberLength;
            }
            // Longer numbers should have no padding and length equal to their value length
            return leadingZeros[i] === 0 && s.length === valueLengths[i];
        });

        if (longerNumbersValid) {
            return shortNumberLength;
        }
    }

    // Check for inconsistent padding within same value length numbers
    const valueGroups = new Map<number, string[]>();
    strings.forEach((s, i) => {
        const vLen = valueLengths[i];
        if (!valueGroups.has(vLen)) {
            valueGroups.set(vLen, []);
        }
        valueGroups.get(vLen)!.push(s);
    });

    // Check for inconsistent padding within groups
    for (const [_, group] of valueGroups) {
        const groupLeadingZeros = group.map(s => {
            let count = 0;
            for (let i = 0; i < s.length; i++) {
                if (s[i] === '0') count++;
                else break;
            }
            return count;
        });
        if (new Set(groupLeadingZeros).size > 1) {
            return -1;
        }
    }

    // Check if all numbers are definitely unpadded
    // A number is definitely unpadded if:
    // 1. It has no leading zeros
    // 2. Its length equals its value length
    // 3. All numbers with the same value length have the same string length
    // 4. The shortest number has length 1
    const shortestValueLength = Math.min(...valueLengths);
    const hasShortestPossibleNumber = strings.some((s, i) => 
        valueLengths[i] === shortestValueLength && s.length === 1
    );

    const allDefinitelyUnpadded = hasShortestPossibleNumber && strings.every((s, i) => {
        if (leadingZeros[i] > 0) return false;
        if (s.length !== valueLengths[i]) return false;
        
        // Check if all numbers with the same value length have the same string length
        const sameValueLengthStrings = strings.filter((_, j) => valueLengths[j] === valueLengths[i]);
        return sameValueLengthStrings.every(other => other.length === s.length);
    });

    if (allDefinitelyUnpadded) {
        return 1;
    }

    // If we have different lengths and no clear pattern,
    // it's inconclusive with the minimum length
    return -minLength;
} 