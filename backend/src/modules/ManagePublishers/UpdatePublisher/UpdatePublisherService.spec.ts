import { Publisher } from "../../../Entities/Publisher";
import { PublisherPrismaRepository } from "../../../Repositories/Implementation/prisma/PublisherPrismaRepository";
import { UpdatePublisherService } from "./UpdatePublisherService";

let publisherPrismaRepository: PublisherPrismaRepository;
let sut: UpdatePublisherService;

beforeAll(async ()=>{
    publisherPrismaRepository = new PublisherPrismaRepository();
    sut = new UpdatePublisherService(publisherPrismaRepository);
});

describe('Testing UpdatePublisherClass with Prisma', ()=>{
    let publisher: Publisher;

    beforeAll(async()=>{
        await publisherPrismaRepository.deleteAllPublishers();
        publisher = await publisherPrismaRepository.save("Aleph"); 
    })

    it("Should throw publisher name too small error", async ()=>{
        await expect(sut.run({
            id: publisher.id, 
            name: "A"
        })).rejects.toEqual(
            new Error("Publisher name is too small")
        )
    })

    it("Should throw an Publisher name is too big error", async ()=>{
        await expect(sut.run({
            id: publisher.id, 
            name: "g8xQ2S6YpNNTFRB00AZ3OOs2fdxHaBRlc1FFsQnCM"
        })).rejects.toEqual(
            new Error("Publisher name is too big")
        )
    })

    it("Should throw publisher not found error", async ()=>{
        await expect(sut.run({
            id: publisher.id + 1, 
            name: "Aleph Changed"
        })).rejects.toEqual(
            new Error("Publisher not found")
        )
    })

    it("Should update an publisher", async ()=>{
        await expect(sut.run({
            id: publisher.id, 
            name: "Aleph Changed"
        })).resolves.toEqual(
            new Publisher({
                name: "Aleph Changed"
            }, publisher.id)
        );
    })
})