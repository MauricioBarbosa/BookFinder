import { Publisher } from './../../../Entities/Publisher';
import { PublisherPrismaRepository } from "../../../Repositories/Implementation/prisma/PublisherPrismaRepository";
import { ReadPublisherService } from "./ReadPublisherService";

let publisherPrismaRepository: PublisherPrismaRepository;
let sut: ReadPublisherService;

beforeAll(async ()=>{
    publisherPrismaRepository = new PublisherPrismaRepository();
    sut = new ReadPublisherService(publisherPrismaRepository);
});

describe("Testing ReadPublisherService class runById method with Prisma", ()=>{

    let publisher: Publisher; 

    beforeAll(async ()=>{
        await publisherPrismaRepository.deleteAllPublishers();
        publisher = await publisherPrismaRepository.save("Fiction");
    })

    it("it should throw an publisher not found error", async ()=>{
        await expect(sut.runById(publisher.id + 1)).rejects.toEqual(
            new Error("Publisher doesn't exist")
        );
    })

    it("it should return an publisher", async ()=>{
        await expect(sut.runById(publisher.id)).resolves.toEqual(
            new Publisher({
                name: "Fiction"
            }, publisher.id)
        );
    })
})

describe("Testing ReadPublisherService class run method", ()=>{

    let publishers: Array<string>

    beforeAll(async ()=>{ 
        await publisherPrismaRepository.deleteAllPublishers();
        publishers = [
            "Rocco", 
            "Aleph", 
            "Record", 
            "Gente"
        ]
        await publisherPrismaRepository.saveMany(publishers); 
    })

    it("Should return all publishers", async ()=>{
        expect((await sut.run())).toHaveLength(
            publishers.length
        ); 
    })

    it("Should have a length equal 2: publishers whose name starts with R", async ()=>{
        expect((await sut.run('R'))).toHaveLength(2);
    })

    it("Should return publishers whose name starts with R", async ()=>{
        expect((await sut.run('R'))).toEqual(
            expect.arrayContaining([
                expect.objectContaining({name: "Rocco"}), 
                expect.objectContaining({name: "Record"})
            ])
        )
    })
})