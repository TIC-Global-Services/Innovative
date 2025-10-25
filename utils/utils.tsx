import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines Tailwind classes using clsx and merges conflicting classes using tailwind-merge.
 * @param inputs - Tailwind classes to combine.
 * @returns Merged class string.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(...inputs))
}
