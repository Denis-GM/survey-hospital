export interface IRegisterAccount {
  login: string,
  email: string,
  role: number,
  password: string,
  passwordConfirm: string
}

export interface ILoginAccount {
  login: string,
  password: string
}