declare global {
  namespace Express {
    interface User {
      username: string;
      id: number;
      password: string;
    }
  }

  interface PublicUserData {
    username: string;
    id: number;
    joinDate?: Date;
  }
}

export {};
