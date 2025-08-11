declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends Omit<AuthUser, 'password'> {}
  }

  type UserRole = 'Admin' | 'User';

  interface AuthUser {
    username: string;
    id: number;
    password: string;
    role: UserRole;
    joinedDate: Date;
  }
}

export {};
