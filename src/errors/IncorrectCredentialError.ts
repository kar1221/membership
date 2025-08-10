class IncorrectCredentialError extends Error {
  public readonly originalError: unknown;

  constructor(message: string) {
    super(message);
    this.name = 'IncorrectCredential';
  }
}

export default IncorrectCredentialError;
