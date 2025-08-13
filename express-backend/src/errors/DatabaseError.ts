class DatabaseError extends Error {
  public readonly code: string;

  public readonly detail: string | null;

  constructor(message: string, code = 'UNKNOWN', detail: string | null = null) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
    this.detail = detail;
  }
}

export default DatabaseError;
