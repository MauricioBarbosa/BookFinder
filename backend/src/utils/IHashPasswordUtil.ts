export interface IHashedPassword{
    password_hash: string, 
    salt: string
}

export interface IHashPasswordUtil{
    generateHash(password: string): Promise<IHashedPassword>
    comparePasswords(password: string, target: string): boolean
}