/**
 * Replaces regular spaces with non-breaking spaces (\u00a0) after short
 * prepositions and conjunctions to prevent awkward line breaks.
 *
 * Target words (case-insensitive):
 * a, an, the, to, in, on, at, of, for, by, with, and, or, but, is, as, if, it, be
 */
const NBSP_RE = /\b(I|a|an|the|to|in|on|at|of|for|by|with|and|or|but|is|as|if|it|be) /gi;

export function nbsp(text: string): string {
  return text.replace(NBSP_RE, (_, word) => `${word}\u00a0`);
}
