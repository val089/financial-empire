import { format } from 'date-fns';

/**
 * Formatter class containing all important functions used
 * for formatting data for presentation.
 * */

export class Formatter {
  /**
   * Extracts only the date from timestamp (without time) for comparison
   */
  public static getDateString(timestamp: string): string {
    const date = new Date(timestamp);
    return format(date, 'yyyy-MM-dd');
  }

  /**
   * Formats date string (2025-06-22T15:52:36.842778) to display in format "22 JUNE" or "22 JUNE 2024"
   * Year is only shown when it is not current year.
   */
  public static formatDate(timestamp: string): string {
    const date = new Date(timestamp);
    const currentYear = new Date().getFullYear();
    const dateYear = date.getFullYear();

    const formatString = dateYear !== currentYear ? 'dd MMMM yyyy' : 'dd MMMM';

    return format(date, formatString).toUpperCase();
  }

  /**
   * Formats time to HH:MM (24-hours format)
   */
  public static timeFromDate(timestamp: string): string {
    const date = new Date(timestamp);
    return format(date, 'HH:mm');
  }

  /**
   * Formats amount to a string with two decimal places and thousands separator
   * Example: 1234567.89 -> "1 234 567,89"
   */
  public static formatAmount(value: number): string {
    // TODO: change to use locale currency formatting
    return value.toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  /**
   * Formats decimal input value with up to 4 decimal places
   * Handles cases like: 12, 12., 12.0, 44444.33, 512.9456, 0.0000, .2342
   * Accepts both dot (.) and comma (,) as decimal separators
   */
  public static formatDecimalInput(
    value: string,
    maxDecimalPlaces = 2
  ): string {
    // Replace comma with dot to normalize decimal separator
    let normalized = value.replace(',', '.');
    let filtered = normalized.replace(/[^0-9.]/g, '');

    // Delete all dots except the first one
    const firstDotIndex = filtered.indexOf('.');
    if (firstDotIndex !== -1) {
      filtered =
        filtered.substring(0, firstDotIndex + 1) +
        filtered.substring(firstDotIndex + 1).replace(/\./g, '');
    }

    // Limit to maxDecimalPlaces digits after the decimal point
    const parts = filtered.split('.');
    if (parts.length === 2 && parts[1].length > maxDecimalPlaces) {
      parts[1] = parts[1].slice(0, maxDecimalPlaces);
      filtered = parts.join('.');
    }

    // Allow dot at the beginning (e.g. ".5" or ",5")
    if (filtered.startsWith('.')) {
      filtered = '0' + filtered;
    }

    // Remove unnecessary leading zeros, but leave "0" before the dot
    if (
      filtered.length > 1 &&
      filtered.startsWith('0') &&
      filtered[1] !== '.'
    ) {
      filtered = filtered.replace(/^0+/, '');
      if (filtered === '') filtered = '0';
    }

    return filtered;
  }
}
