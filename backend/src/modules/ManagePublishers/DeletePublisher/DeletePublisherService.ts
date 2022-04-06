import { IPublisherRepository } from "../../../Repositories/IPublisherRepository";
import { IDeletePublisherDTO } from "./IDeletePublisherDTO";

export class DeletePublisherService{
    constructor(private categoriesRepository: IPublisherRepository) {}

    async run(category: IDeletePublisherDTO){
        const foundPublisher = await this.categoriesRepository.findById(category.id);

        if(!foundPublisher){
            throw new Error("Publisher doesn't exist"); 
        }

        await this.categoriesRepository.deletePublisher(foundPublisher.id);
    }
}