import { Publisher } from './../Entities/Publisher';

export interface IPublisherRepository{
    save(publisher: string): Promise<Publisher>;
    saveMany(publishers: Array<string>): Promise<void> 
    checkExists(name: string): Promise<boolean>; 
    findByName(name: string): Promise<Array<Publisher>>
    findAll(): Promise<Array<Publisher>>
    findById(id: number): Promise<Publisher | null>
    updatePublisher(publisher: Publisher): Promise<Publisher>
    deleteAllPublishers(): Promise<void>;
    deletePublisher(id: number); 
}