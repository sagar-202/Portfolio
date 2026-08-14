/**
 * SAGAR.DB Query Engine — Executor
 *
 * Pure timing logic for query execution.
 * No side effects, no navigation. The hook handles those.
 */

/** Total time before navigation fires (ms) */
export const EXEC_DURATION_MS = 260;
/** Time success state is shown before navigation (ms) */
export const SUCCESS_DURATION_MS = 240;
/** Total animation time = EXEC + SUCCESS */
export const TOTAL_QUERY_MS = EXEC_DURATION_MS + SUCCESS_DURATION_MS;

export interface ExecTiming {
  execDuration: number;
  successDuration: number;
  total: number;
}

export function getExecTiming(): ExecTiming {
  return {
    execDuration: EXEC_DURATION_MS,
    successDuration: SUCCESS_DURATION_MS,
    total: TOTAL_QUERY_MS,
  };
}
