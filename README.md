# Number Padding Consistency Checker

This TypeScript project implements a solution to check the consistency of number padding in a sequence of strings. The problem involves analyzing a collection of string representations of numbers to determine if they follow a consistent padding pattern.

## Problem Description

Given a sequence of strings containing numbers, we need to determine if these numbers follow a consistent padding pattern. Padding refers to the addition of leading zeros to make numbers have the same length. For example:

- Consistent padding: `["001", "002", "003"]` (all padded to 3 digits)
- Inconsistent padding: `["1", "02", "003"]` (different padding lengths)
- No padding: `["1", "2", "3"]` (no leading zeros)

## Solution

The solution is implemented in the `checkNumberPadding` function, which returns a number indicating the padding status:

- Positive number (>1): Consistent padding length (the number represents the padding length)
- 1: No padding used
- Negative number (<-1): Inconclusive padding (the absolute value represents the minimum length observed)
- -1: Inconsistent padding
- 0: No observations (empty input)

### Key Features

1. **Padding Detection**: The function analyzes leading zeros and string lengths to determine padding patterns.
2. **Consistency Checking**: It verifies if numbers with the same value length have consistent padding.
3. **Overflow Handling**: The solution properly handles cases where some numbers are longer due to value overflow.
4. **Edge Cases**: Handles empty input and various edge cases appropriately.

## Implementation Details

The solution uses several JavaScript/TypeScript features and techniques:

1. **Array Methods**:
   - `map()`: Transform strings to numbers and track lengths
   - `filter()`: Group numbers by value length
   - `every()`: Check consistency across groups
   - `some()`: Check for specific conditions

2. **String Operations**:
   - `startsWith()`: Check for leading zeros
   - `toString()`: Convert numbers back to strings
   - String length tracking

3. **Data Structures**:
   - `Map`: Group strings by value length
   - `Set`: Check for unique padding patterns

4. **TypeScript Features**:
   - Type annotations
   - Iterable interface
   - Generic types

## Usage Example

```typescript
import { checkNumberPadding } from './src';

// Consistent padding
console.log(checkNumberPadding(["001", "002", "003"])); // Returns 3

// No padding
console.log(checkNumberPadding(["1", "2", "3"])); // Returns 1

// Inconsistent padding
console.log(checkNumberPadding(["1", "02", "003"])); // Returns -1

// Inconclusive
console.log(checkNumberPadding(["1", "12", "123"])); // Returns -1
```

## Testing

The project includes Jest tests to verify the correctness of the implementation. Run tests using:

```bash
npm test
```

## Requirements

- Node.js
- TypeScript
- Jest (for testing)

## Installation

```bash
npm install
```

## License

MIT 