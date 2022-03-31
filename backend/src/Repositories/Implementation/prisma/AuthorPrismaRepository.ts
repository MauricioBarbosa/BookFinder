import { prisma } from '../../../database/prisma/client';
import { IAuthorRepository } from '../../IAuthorRepository';

export class AuthorPrismaRepository implements IAuthorRepository{

    async save(author: string): Promise<void> {
        await prisma.author.create({
            data: {
                name: author
            }
        }); 
    }

    async checkExists(name: string): Promise<boolean> {
        const author = await prisma.author.findMany({
            where: {
                name: name
            }
        }); 

        return !!author; 
    }
}