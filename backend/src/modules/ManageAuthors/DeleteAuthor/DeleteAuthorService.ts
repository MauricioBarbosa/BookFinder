import { IAuthorRepository } from "../../../Repositories/IAuthorRepository";
import { IDeleteAuthorDTO } from "./IDeleteAuthorDTO";

export class DeleteAuthorService{
    constructor(private authorsRepository: IAuthorRepository) {}

    async run(author: IDeleteAuthorDTO): Promise<void>{
        const foundAuthor = await this.authorsRepository.findById(author.id);

        if(!foundAuthor){
            throw new Error("Author doesn't exist"); 
        }

        await this.authorsRepository.deleteAuthor(foundAuthor.id);
    }
}