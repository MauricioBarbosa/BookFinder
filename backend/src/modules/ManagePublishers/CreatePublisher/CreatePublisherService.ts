import { Publisher } from './../../../Entities/Publisher';
import { IPublisherRepository } from '../../../Repositories/IPublisherRepository';
import { ICreatePublisherDTO } from './ICreatePublisherDTO';

export class CreatePublisherService{

    constructor(private publishersRepository: IPublisherRepository) {}

    async run(publisher: ICreatePublisherDTO): Promise<Publisher>{
        if(publisher.name.length < 2){
            throw new Error("Publisher name is too small"); 
        }

        if(publisher.name.length > 40){
            throw new Error("Publisher name is too big"); 
        }
        
        const publisherExists = await this.publishersRepository.checkExists(publisher.name);

        if(publisherExists){
            throw new Error("Publisher already exists"); 
        }

        return await this.publishersRepository.save(publisher.name);
    }
}