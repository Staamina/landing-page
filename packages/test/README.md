# @staamina/test

Shared testing utilities for Staamina applications.

## Installation

This package is included in the monorepo. To use it in your tests:

```typescript
import { selectDropdownOption } from '@staamina/test';
```

## Dropdown Helpers

Utilities for testing the custom Dropdown component from `@staamina/ui`.

### `selectDropdownOption`

Select an option in a Dropdown component by its text.

```typescript
await selectDropdownOption('issue', 'Test Issue 1');
await selectDropdownOption('issue', /test issue/i);
await selectDropdownOption('issue', 'Issue 1', { timeout: 5000 });
```

**Parameters:**

- `dropdownId` (string): The id attribute of the dropdown button
- `optionText` (string | RegExp): The text of the option to select
- `options` (optional): Configuration object
  - `timeout` (number): Maximum time to wait for the option (default: 3000ms)

### `expectDropdownValue`

Assert that a dropdown has a specific value selected.

```typescript
await expectDropdownValue('issue', 'Test Issue 1');
await expectDropdownValue('issue', /select an option/i);
```

**Parameters:**

- `dropdownId` (string): The id attribute of the dropdown button
- `expectedText` (string | RegExp): The expected text in the dropdown button

### `getDropdownOptions`

Get all available options from a dropdown.

```typescript
const options = await getDropdownOptions('issue');
expect(options).toContain('Test Issue 1');
```

**Parameters:**

- `dropdownId` (string): The id attribute of the dropdown button
- `options` (optional): Configuration object
  - `timeout` (number): Maximum time to wait for the dropdown to open (default: 3000ms)

**Returns:** `Promise<string[]>` - Array of option texts

### `isDropdownDisabled`

Check if a dropdown is disabled.

```typescript
const disabled = isDropdownDisabled('issue');
expect(disabled).toBe(false);
```

**Parameters:**

- `dropdownId` (string): The id attribute of the dropdown button

**Returns:** `boolean` - Whether the dropdown is disabled

## Usage Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { selectDropdownOption, expectDropdownValue } from '@staamina/test';
import { MyForm } from './MyForm';

describe('MyForm', () => {
  it('selects an issue from dropdown', async () => {
    render(<MyForm />);

    // Wait for dropdown to be ready
    await waitFor(() => {
      const dropdown = document.getElementById('issue');
      expect(dropdown).toBeInTheDocument();
    });

    // Select an option
    await selectDropdownOption('issue', 'Test Issue 1');

    // Verify selection
    await expectDropdownValue('issue', 'Test Issue 1');
  });
});
```

## Contributing

When adding new test utilities:

1. Add the utility function to the appropriate file in `src/`
2. Export it from `src/index.ts`
3. Document it in this README
4. Add JSDoc comments with examples
