/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { AuthUser as IAuthUser, User as IUser } from 'shared-types';

declare global {
  namespace Express {
    interface User extends IUser {}
  }

  interface AuthUser extends IAuthUser {}

  interface SignUpInfo extends Omit<IAuthUser, 'id' | 'joinedDate'> {}
}

export {};
