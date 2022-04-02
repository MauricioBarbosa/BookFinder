import { Author } from "../../../Entities/Author";
import { IAuthorRepository } from "../../../Repositories/IAuthorRepository";

export class ReadAuthorService{
    constructor(private authorsRepository: IAuthorRepository) {}

    async runById(id: number): Promise<Author>{
        const author = await this.authorsRepository.findById(id);

        if(!author){
            throw new Error("Author doesn't exist"); 
        }

        return author; 
    }

    async run(name?: string): Promise<Array<Author>>{
        if(name)
            return await this.authorsRepository.findByName(name);
        return this.authorsRepository.findAll();
    }
}