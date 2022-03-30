import { Author } from '../../../Entities/Author';
import { Author as PrismaAuthorModel, Prisma } from '.prisma/client';
import { IAuthorRepository } from '../../IAuthorRepository';
import { PrismaConnection } from './PrismaConnection';

export class AuthorPrismaRepository implements IAuthorRepository{
    private model: Prisma.AuthorDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation>;

    constructor(db: PrismaConnection){
        this.model = db.Connect().author;
    }

    async save(author: Author): Promise<void> {
        await this.model.create({
            data: {
                name: author.name
            }
        }); 
    }

    async findByName(name: string): Promise<any> {
        return await this.model.findFirst({
            where: {
                name: {
                    contains: name
                }
            }
        })
    }
}