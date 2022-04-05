import { prisma } from '../../../database/prisma/client';
import { Publisher } from '../../../Entities/Publisher';
import { IPublisherRepository } from './../../IPublisherRepository';

export class PublisherPrismaRepository implements IPublisherRepository{
    
    async checkExists(name: string): Promise<boolean> {
        const Publisher = await prisma.publisher.findFirst({
            where: {
                name: name
            }
        }); 

        return !!Publisher; 
    }

    async save(publisher: string): Promise<Publisher> {
        const createdPublisher = await prisma.publisher.create({
            data: {
                name: publisher
            }
        });
        
        return new Publisher({
            name: createdPublisher.name, 
        } , createdPublisher.id);
    }

    async saveMany(Publishers: string[]): Promise<void> {
        const createdPublishers = await prisma.publisher.createMany({
            data: Publishers.map((Publisher)=>{
                return { name: Publisher }
            })
        })
    }

    async findAll(): Promise<Publisher[]> {
        const Publishers = await prisma.publisher.findMany();
        
        return Publishers.map((publisher)=>{
            return new Publisher({
                name: publisher.name, 
            }, publisher.id)
        })
    }

    async findById(id: number): Promise<Publisher | null> {
        const foundPublisher = await prisma.publisher.findFirst({
            where: {
                id: id
            }
        })

        if(foundPublisher){
            return new Publisher({
                name: foundPublisher.name
            }, foundPublisher.id);
        }

        return null;
    }

    async findByName(name: string): Promise<Publisher[]> {
        const Publishers = await prisma.publisher.findMany({
            where: {
                name: {
                    startsWith: name
                }
            }
        })

        return Publishers.map((publisher)=>{
            return new Publisher({
                name: publisher.name, 
            }, publisher.id)
        })
    }

    async updatePublisher(publisher: Publisher): Promise<Publisher> {
        const updatedPublisher = await prisma.publisher.update({
            data: {
                name: publisher.name
            }, 
            where: {
                id: publisher.id
            }
        })

        return new Publisher({
            name: updatedPublisher.name, 
        }, updatedPublisher.id);
    }

    async deleteAllPublishers(): Promise<void> {
        await prisma.publisher.deleteMany({});
    }

    async deletePublisher(id: number) {
        await prisma.publisher.delete({
            where: {
                id: id
            }
        })
    }
}