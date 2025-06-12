import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const extendedTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': ['text-h1', 'text-h2', 'text-h3', 'text-h4'],
      'font-family': ['interLight', 'interRegular', 'interMedium', 'interBold'],
    },
  },
});

export const mergeClasses = (...args: ClassValue[]) =>
  extendedTwMerge(clsx(args));
