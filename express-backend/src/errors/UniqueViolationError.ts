import DatabaseError from './DatabaseError';

export default class UniqueViolationError extends DatabaseError {
  constructor(field: string, value: string) {
    super(`Duplicated value for field ${field}: ${value}`, '23305');
    this.name = 'UniqueViolationError';
  }
}
