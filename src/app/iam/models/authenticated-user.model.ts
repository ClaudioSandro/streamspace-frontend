export interface AuthenticatedUser {
  id: number;
  username: string;
  token: string;
  role: string;
}
