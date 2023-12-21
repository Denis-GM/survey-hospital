import { Role } from "./Role";

export interface IUser {
    id: string;
    login: string;
    email: string;
    role: Role;
    token?: string;
}