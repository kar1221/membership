/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { AuthUser as IAuthUser } from 'shared-types';

declare global {
  namespace Express {
    interface User extends IAuthUser {}
  }

  interface SignUpInfo extends Omit<IAuthUser, 'id' | 'joinedDate'> {}
}

export {};
