import { prisma } from '../../../database/prisma/client';
import { User } from '../../../Entities/User';
import { IUserRepository } from './../../IUserRepository';

export class UserPrismaRepository implements IUserRepository{

    async checkExists(username: string): Promise<boolean> {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        return !!user;
    }

    async save(user: User): Promise<User> {
        const userSaved = await prisma.user.create({
            data: {
                username: user.username,
                salt: user.salt,
                role: user.role,
            
            }
        })
    }
}