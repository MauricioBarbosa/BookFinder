import { IHashPasswordUtil } from './../../../utils/IHashPasswordUtil';
import { ICreateUserDTO } from './ICreateUserDTO';
import { IUserRepository } from '../../../Repositories/IUserRepository';

export class CreateUserService{

    constructor(
        private publisherRepository: IUserRepository,
        private hashPasswordUtil: IHashPasswordUtil
    ){}

    async run(user: ICreateUserDTO){
    }
}