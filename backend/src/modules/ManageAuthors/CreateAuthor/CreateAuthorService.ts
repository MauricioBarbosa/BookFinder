import { IAuthorRepository } from '../../../Repositories/IAuthorRepository';
import { ICreateAuthorDTO } from './ICreateAuthorDTO';

export class CreateAuthorService{

    constructor(private authorsRepository: IAuthorRepository) {}

    async run(author: ICreateAuthorDTO){
        if(author.name.length < 2){
            throw new Error("Author name is too small"); 
        }

        if(author.name.length > 40){
            throw new Error("Author name is too big"); 
        }
        
        const authorExists = await this.authorsRepository.checkExists(author.name);

        if(authorExists){
            throw new Error("Author already exists"); 
        }

        await this.authorsRepository.save(author.name);
    }
}