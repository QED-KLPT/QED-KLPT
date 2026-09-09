/** Test data and random-value generators for the Learning Observation Toolkit end-to-end scenarios. */

export function randomLearnerCode(): string {
  return String(Math.floor(100 + Math.random() * 900));
}

export function randomObserverName(): string {
  return `Observer ${Math.random().toString(36).slice(2, 8)}`;
}

export function randomChildName(): string {
  return `Child ${Math.random().toString(36).slice(2, 8)}`;
}

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

/** Shape of learningStatementText, used by the shared statement-filling helpers. */
export type LearningStatementText = typeof learningStatementText;
