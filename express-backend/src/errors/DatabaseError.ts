class DatabaseError extends Error {
  public readonly originalError: unknown;

  constructor(message: string, originalError: unknown) {
    super(message);
    this.name = 'DatabaseError';
    this.originalError = originalError;

    if (originalError instanceof Error) this.stack = originalError.stack;
  }
}

export default DatabaseError;
