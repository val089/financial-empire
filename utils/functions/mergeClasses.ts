import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const mergeClasses = (...args: ClassValue[]) => twMerge(clsx(args));
