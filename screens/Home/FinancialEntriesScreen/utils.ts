/**
 * Funkcje pomocnicze do formatowania dat i godzin dla FinancialEntriesScreen
 */

/**
 * Wyciąga tylko datę z timestamp-u (bez czasu) do porównywania
 */
export const getDateString = (timestamp: string): string =>
  new Date(timestamp).toDateString();

/**
 * Formatuje datę do wyświetlenia w formacie "22 JUNE" lub "22 JUNE 2024"
 * Rok jest pokazywany tylko gdy nie jest to obecny rok
 */
export const formatDisplayDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const currentYear = new Date().getFullYear();
  const dateYear = date.getFullYear();

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
  };

  if (dateYear !== currentYear) {
    options.year = 'numeric';
  }

  return date.toLocaleDateString(undefined, options).toUpperCase();
};

/**
 * Formats time to HH:MM (24-hours format)
 */
export const formatTimeToHHMM = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
