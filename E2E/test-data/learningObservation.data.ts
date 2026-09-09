/**
 * Test data and random-value generators for the full Learning Observation
 * Toolkit end-to-end scenario (Launch session -> Review and download).
 *
 * Keep locators out of this file (they belong on the Page Objects) — this is
 * data only, so the exact same values can be asserted on later screens (e.g.
 * the Review and download screen) without retyping them.
 */

/** Generates a random 3-digit Learner code, e.g. "482" (matches the "e.g. 123" placeholder on the Sessions screen). */
export function randomLearnerCode(): string {
  return String(Math.floor(100 + Math.random() * 900));
}

/** Generates a random, unique Observer name for a single test run. */
export function randomObserverName(): string {
  return `Observer ${Math.random().toString(36).slice(2, 8)}`;
}

/** Generates a random, unique Child's name for a single test run. */
export function randomChildName(): string {
  return `Child ${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Learning progression statement field text — meaningful, human-readable
 * content (rather than placeholder gibberish) so it reads sensibly if a
 * screenshot or report is reviewed, while still being exact and unique enough
 * to verify verbatim on the Review and download screen.
 */
export const learningStatementText = {
  description:
    'Observed the child engaged in small-group play, using single words and gestures to request items and join in with peers.',
  professionalReflection:
    'The child showed emerging confidence combining single words with gesture to communicate intent, consistent with the observed behaviour level.',
  supportLearning:
    'Model short, simple phrases during play and respond to gestures by naming the object or action to help extend vocabulary.',
  qklgReflection:
    'This learning reflects the QKLG Communicating Learning and Development Area and the EYLF Learning Outcome: Children are effective communicators.',
};

/**
 * Shape of {@link learningStatementText} — used by shared helpers (see
 * fillLearningStatementFields in tests/helpers/learningObservationFlow.ts) so
 * every per-Domain end-to-end scenario spec can fill the Learning statement
 * fields the same way without retyping the field list.
 */
export type LearningStatementText = typeof learningStatementText;
