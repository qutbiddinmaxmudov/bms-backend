export interface UserDto {
  userId: number;
  username: string;
  role: 'admin' | 'owner' | 'member';
}

export interface JWTDto {
  sub: number;
  username: string;
  role: 'admin' | 'owner' | 'member';
}
