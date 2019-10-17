export const getSafe = <T>(fn: () => T): T | null => {
  try {
    return fn();
  } catch (_) {
    return null;
  }
};
