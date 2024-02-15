export enum Role {
    Analyst = 3,
    Admin = 2
}

export interface IUser {
    id: string;
    login: string;
    email: string;
    role: Role;
    token?: string;
}