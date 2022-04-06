import { Publisher } from "../../../Entities/Publisher";
import { IPublisherRepository } from "../../../Repositories/IPublisherRepository";

export class ReadPublisherService{
    constructor(private publishersRepository: IPublisherRepository) {}

    async runById(id: number): Promise<Publisher>{
        const publisher = await this.publishersRepository.findById(id);

        if(!publisher){
            throw new Error("Publisher doesn't exist"); 
        }

        return publisher; 
    }

    async run(name?: string): Promise<Array<Publisher>>{
        if(name)
            return await this.publishersRepository.findByName(name);
        return this.publishersRepository.findAll();
    }
}