import { Author } from '../../../Entities/Author';
import { IAuthorRepository } from '../../IAuthorRepository';
import { PrismaConnection } from './PrismaConnection';

export class AuthorPrismaRepository implements IAuthorRepository{
    model: any;

    constructor(db: PrismaConnection){
        this.model = db.Connect().author; 
    }

    save(author: Author): Promise<void> {
        throw new Error('Method not implemented.');
    }

    findByName(name: string): Promise<any> {
        
    }
}