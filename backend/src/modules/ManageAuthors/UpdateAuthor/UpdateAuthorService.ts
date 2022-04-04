import { Author } from '../../../Entities/Author';
import { IAuthorRepository } from '../../../Repositories/IAuthorRepository';
import { IUpdateAuthorDTO } from './IUpdateAuthorDTO';

export class UpdateAuthorService{
    constructor(private authorsRepository: IAuthorRepository) {}

    async run(author: IUpdateAuthorDTO){
        if(author.name.length < 2){
            throw new Error("Author name is too small");
        }

        if(author.name.length > 40){
            throw new Error("Author name is too big");
        }

        const authorExists = await this.authorsRepository.findById(author.id); 

        if(!authorExists){
            throw new Error("Author not found");
        }

        return this.authorsRepository.updateAuthor(new Author({
            name: author.name
        }, author.id));
    }
}