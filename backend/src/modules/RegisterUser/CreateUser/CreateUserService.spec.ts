import { HashPasswordUtilBcrypt } from './../../../utils/bcrypt/HashPasswordUtilBcrypt';
import { Role } from './../../../Entities/Role';
import { CreateUserService } from './CreateUserService';
import { UserPrismaRepository } from "../../../Repositories/Implementation/prisma/UserPrismaRepository";
import { ICreateUserDTO } from './ICreateUserDTO';

let userPrismaRepository: UserPrismaRepository;
let hashPasswordUtilBcrypt: HashPasswordUtilBcrypt;
let sut: CreateUserService;

beforeAll(async ()=>{
    userPrismaRepository = new UserPrismaRepository();
    hashPasswordUtilBcrypt = new HashPasswordUtilBcrypt();
    sut = new CreateUserService(userPrismaRepository, hashPasswordUtilBcrypt);
});

describe("Testing CreateUserService with prisma", ()=>{
    it("Should throw an username too small error", async ()=>{
        const user: ICreateUserDTO = {
            username: "A", 
            password: "B",
            password_check: "C",
            role: Role.USER
        }

        await expect(sut.run(user)).rejects.toEqual(
            new Error("Username is too small")
        ); 
    })

    it("Should throw an password is too small error", async ()=>{
        const user: ICreateUserDTO = {
            username: "usuario_criado", 
            password: "B",
            password_check: "C",
            role: Role.USER
        }

        await expect(sut.run(user)).rejects.toEqual(
            new Error("password is too small")
        ); 
    })

    it("Should throw a password must contain at least one special character error", async ()=>{
        const user: ICreateUserDTO = {
            username: "usuario_criado", 
            password: "usuario_password",
            password_check: "C",
            role: Role.USER
        }

        await expect(sut.run(user)).rejects.toEqual(
            new Error("Password must contain at least one special character")
        ); 
    })

    it("Should throw a passwords don't match error", async ()=>{
        const user: ICreateUserDTO = {
            username: "usuario_criado", 
            password: "usuario_password@",
            password_check: "C",
            role: Role.USER
        }

        await expect(sut.run(user)).rejects.toEqual(
            new Error("Passwords don't match")
        ); 
    })

    it("Should throw a user already exists error", async ()=>{
        const user: ICreateUserDTO = {
            username: "usuario_criado", 
            password: "usuario_password@",
            password_check: "usuario_password@",
            role: Role.USER
        }

        sut.run(user);

        await expect(sut.run(user)).rejects.toEqual(
            new Error("User already exists")
        ); 
    })

    it("Check if the function that generates hash was called", async ()=>{
        
    })

    it("Should create a new user", async ()=>{
        
    })
})