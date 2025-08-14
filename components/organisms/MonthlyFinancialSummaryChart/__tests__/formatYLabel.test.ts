import { formatYLabel } from '../utils';

describe('formatYLabel', () => {
  it('formats values >= 1M with M suffix', () => {
    expect(formatYLabel('1000000')).toBe('1.0M');
    expect(formatYLabel('2500000')).toBe('2.5M');
    expect(formatYLabel('10000000')).toBe('10.0M');
  });

  it('formats values >= 1k with k suffix', () => {
    expect(formatYLabel('1000')).toBe('1k');
    expect(formatYLabel('2500')).toBe('3k'); // rounds to nearest thousand
    expect(formatYLabel('999999')).toBe('1000k');
  });

  it('returns original value for values < 1k', () => {
    expect(formatYLabel('999')).toBe('999');
    expect(formatYLabel('500')).toBe('500');
    expect(formatYLabel('0')).toBe('0');
  });

  it('handles decimal values correctly', () => {
    expect(formatYLabel('1500.5')).toBe('2k');
    expect(formatYLabel('1500000.75')).toBe('1.5M');
  });

  it('returns original value for non-numeric strings', () => {
    expect(formatYLabel('invalid')).toBe('invalid');
    expect(formatYLabel('abc123')).toBe('abc123');
    expect(formatYLabel('')).toBe('');
  });

  it('handles negative values', () => {
    expect(formatYLabel('-1000')).toBe('-1k');
    expect(formatYLabel('-2500000')).toBe('-2.5M');
    expect(formatYLabel('-500')).toBe('-500');
  });
});
