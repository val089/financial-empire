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
}
