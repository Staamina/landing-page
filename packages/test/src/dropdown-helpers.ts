import { fireEvent, screen, waitFor } from '@testing-library/react';

/**
 * Helper to select an option in a Dropdown component
 *
 * @param dropdownId - The id of the dropdown button
 * @param optionText - The text of the option to select (can be a string or regex)
 * @param options - Optional configuration
 * @returns Promise that resolves when the option is selected
 *
 * @example
 * ```ts
 * // Select by exact text
 * await selectDropdownOption('issue', 'Issue 1');
 *
 * // Select by regex
 * await selectDropdownOption('issue', /issue 1/i);
 *
 * // With custom timeout
 * await selectDropdownOption('issue', 'Issue 1', { timeout: 5000 });
 * ```
 */
export async function selectDropdownOption(
  dropdownId: string,
  optionText: string | RegExp,
  options: { timeout?: number } = {}
): Promise<void> {
  const { timeout = 3000 } = options;

  // Find and click the dropdown button
  const dropdownButton = document.getElementById(dropdownId);

  if (!dropdownButton) {
    throw new Error(`Dropdown with id "${dropdownId}" not found`);
  }

  fireEvent.click(dropdownButton);

  // Wait for the dropdown menu to open and find the option
  await waitFor(
    () => {
      const option = screen.getByText(optionText);
      expect(option).toBeInTheDocument();
    },
    { timeout }
  );

  // Click the option
  const option = screen.getByText(optionText);
  fireEvent.click(option);

  // Wait for the dropdown to close (option should disappear from the list)
  await new Promise((resolve) => setTimeout(resolve, 100));
}

/**
 * Helper to check if a dropdown has a specific value selected
 *
 * @param dropdownId - The id of the dropdown button
 * @param expectedText - The expected text in the dropdown button
 * @returns Promise that resolves when the check is complete
 *
 * @example
 * ```ts
 * await expectDropdownValue('issue', 'Issue 1');
 * await expectDropdownValue('issue', /select an option/i);
 * ```
 */
export async function expectDropdownValue(
  dropdownId: string,
  expectedText: string | RegExp
): Promise<void> {
  const dropdownButton = document.getElementById(dropdownId);

  if (!dropdownButton) {
    throw new Error(`Dropdown with id "${dropdownId}" not found`);
  }

  await waitFor(() => {
    if (typeof expectedText === 'string') {
      expect(dropdownButton).toHaveTextContent(expectedText);
    } else {
      const text = dropdownButton.textContent || '';
      expect(text).toMatch(expectedText);
    }
  });
}

/**
 * Helper to open a dropdown and check available options
 *
 * @param dropdownId - The id of the dropdown button
 * @param options - Optional configuration
 * @returns Promise that resolves with the list of option texts
 *
 * @example
 * ```ts
 * const options = await getDropdownOptions('issue');
 * expect(options).toContain('Issue 1');
 * ```
 */
export async function getDropdownOptions(
  dropdownId: string,
  options: { timeout?: number } = {}
): Promise<string[]> {
  const { timeout = 3000 } = options;

  // Find and click the dropdown button
  const dropdownButton = document.getElementById(dropdownId);

  if (!dropdownButton) {
    throw new Error(`Dropdown with id "${dropdownId}" not found`);
  }

  fireEvent.click(dropdownButton);

  // Wait for the dropdown menu to open
  await waitFor(
    () => {
      const list = document.querySelector('ul');
      expect(list).toBeInTheDocument();
    },
    { timeout }
  );

  // Get all option elements
  const listItems = document.querySelectorAll('ul li');
  const optionTexts = Array.from(listItems).map(
    (item) => item.textContent || ''
  );

  // Close the dropdown
  fireEvent.click(dropdownButton);

  return optionTexts;
}

/**
 * Helper to check if a dropdown is disabled
 *
 * @param dropdownId - The id of the dropdown button
 * @returns Boolean indicating if the dropdown is disabled
 *
 * @example
 * ```ts
 * const isDisabled = isDropdownDisabled('issue');
 * expect(isDisabled).toBe(true);
 * ```
 */
export function isDropdownDisabled(dropdownId: string): boolean {
  const dropdownButton = document.getElementById(dropdownId);

  if (!dropdownButton) {
    throw new Error(`Dropdown with id "${dropdownId}" not found`);
  }

  return dropdownButton.hasAttribute('disabled');
}
