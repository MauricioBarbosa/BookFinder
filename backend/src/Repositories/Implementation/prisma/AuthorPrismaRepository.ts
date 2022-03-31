import { prisma } from '../../../database/prisma/client';
import { IAuthorRepository } from '../../IAuthorRepository';

export class AuthorPrismaRepository implements IAuthorRepository{

    public async save(author: string): Promise<void> {
        await prisma.author.create({
            data: {
                name: author
            }
        }); 
    }

    public async checkExists(name: string): Promise<boolean> {
        const author = await prisma.author.findFirst({
            where: {
                name: name
            }
        }); 

        return !!author; 
    }
}