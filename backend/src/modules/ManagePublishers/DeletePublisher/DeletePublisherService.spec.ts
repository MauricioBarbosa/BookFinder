import { Publisher } from './../../../Entities/Publisher';
import { PublisherPrismaRepository } from "../../../Repositories/Implementation/prisma/PublisherPrismaRepository";
import { DeletePublisherService } from "./DeletePublisherService"

let publisherPrismaRepository: PublisherPrismaRepository;
let sut: DeletePublisherService;

beforeAll(async () =>{
    publisherPrismaRepository = new PublisherPrismaRepository();
    sut = new DeletePublisherService(publisherPrismaRepository);
})

describe('Testing DeletePublisherService class with Prisma', ()=>{

    let publisher: Publisher;

    beforeAll(async ()=>{
        await publisherPrismaRepository.deleteAllPublishers(); 
        publisher = await publisherPrismaRepository.save('Publisher de Teste');
    })

    it("it should throw publisher doesn't exist error", async ()=>{
        await expect(sut.run({
            id: -1
        })).rejects.toEqual(
            new Error("Publisher doesn't exist")
        );
    })

    it('Should delete a publisher', async ()=>{
        await sut.run({
            id: publisher.id
        });
        await expect(sut.run({
            id: publisher.id
        })).rejects.toEqual(
            new Error("Publisher doesn't exist")
        );
    })
})