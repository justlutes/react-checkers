export interface IUser {
  email: string;
  username: string;
  isAuthenticated: boolean;
}

export interface IFirebaseUser {
  name: string;
  wins: number;
}
