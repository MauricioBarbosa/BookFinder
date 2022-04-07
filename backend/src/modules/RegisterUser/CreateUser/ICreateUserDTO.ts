import { Role } from './../../../Entities/Role';

export interface ICreateUserDTO{
    username: string, 
    password: string, 
    password_check: string,
    role: Role
}