import { Publisher } from '../../../Entities/Publisher';
import { IPublisherRepository } from '../../../Repositories/IPublisherRepository';
import { IUpdatePublisherDTO } from './IUpdatePublisherDTO';

export class UpdatePublisherService{
    constructor(private publishersRepository: IPublisherRepository) {}

    async run(publisher: IUpdatePublisherDTO){
        if(publisher.name.length < 2){
            throw new Error("Publisher name is too small");
        }

        if(publisher.name.length > 40){
            throw new Error("Publisher name is too big");
        }

        const publisherExists = await this.publishersRepository.findById(publisher.id);

        if(!publisherExists){
            throw new Error("Publisher not found");
        }

        return this.publishersRepository.updatePublisher(new Publisher({
            name: publisher.name
        }, publisher.id));
    }
}