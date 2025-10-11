export interface UserLoginResponse {
  id: number;
  username: string;
}
export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserRegisterResponse {
  id: number;
  username: string;
}
export interface UserRegisterRequest {
  username: string;
  password: string;
}
export interface UserRefreshTokenResponse {
  id: number;
  username: string;
}

