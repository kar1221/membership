export type UserRole = 'Admin' | 'User';

export interface User {
  username: string;
  firstName: string;
  lastName: string;
  id: number;
  role: UserRole;
  joinedDate: Date;
}

export interface AuthUser extends User {
  password: string;
}
