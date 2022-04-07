import { User } from './../Entities/User';

export interface IUserRepository{
    checkExists(username: string): Promise<boolean>
    save(user: User): Promise<User>
}