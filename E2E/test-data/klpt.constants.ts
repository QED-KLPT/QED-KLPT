/**
 * Centrally defined constants for the KLPT automation suite.
 *
 * KLPT_PASSKEY is a standard, shared application passkey used by everyone who
 * accesses the KLPT Test environment (confirmed by the project owner — this is
 * not a per-user secret), so it is intentionally defined once, here, as a plain
 * constant rather than sourced from an environment variable.
 *
 * Do NOT duplicate this value in any Page Object or test file — import it from
 * here wherever the passkey is needed.
 */
export const KLPT_PASSKEY = 'klpt';
