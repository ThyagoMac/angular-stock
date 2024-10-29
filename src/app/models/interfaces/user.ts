export interface UserSignupInterface {
  name: string;
  email: string;
  password: string;
}

export interface UserSignupResponseInterface {
  id: string;
  name: string;
  email: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface UserLoginResponseInterface {
  id: string;
  name: string;
  email: string;
  token: string;
}
