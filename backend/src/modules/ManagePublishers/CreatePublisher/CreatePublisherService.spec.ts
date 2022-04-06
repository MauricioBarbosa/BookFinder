import { Publisher } from './../../../Entities/Publisher';
import { PublisherPrismaRepository } from "../../../Repositories/Implementation/prisma/PublisherPrismaRepository";
import { CreatePublisherService } from "./CreatePublisherService";

let publisherPrismaRepository: PublisherPrismaRepository;
let sut: CreatePublisherService;

beforeAll(async () =>{
    publisherPrismaRepository = new PublisherPrismaRepository();
    sut = new CreatePublisherService(publisherPrismaRepository);
})

describe('Testing CreatePublisherService class with Prisma', ()=>{

    beforeAll(async()=>{
        await publisherPrismaRepository.deleteAllPublishers();
    })

    it('should create a Publisher', async ()=>{
        await expect(sut.run({
            name: "Comedy"
        })).resolves.toEqual(expect.objectContaining({
            id: expect.any(Number), 
            name: expect.any(String), 
        }))
    })

    it("shouldn't create a Publisher with name length lesser than 2 letters", async ()=>{
        await expect(sut.run({
            name: "a"
        })).rejects.toEqual(
            new Error('Publisher name is too small')
        )
    })

    it("shouldn't create a Publisher with name length bigger than 40 letters", async ()=>{
        await expect(sut.run({
            name: "g8xQ2S6YpNNTFRB00AZ3OOs2fdxHaBRlc1FFsQnCM"
        })).rejects.toEqual(
            new Error('Publisher name is too big')
        )
    })

    it("shouldn't create two Publishers of the same name", async ()=>{
        await sut.run({
            name: "Horror"
        });  
        await expect(sut.run({
            name: "Horror"
        })).rejects.toEqual(
            new Error("Publisher already exists")
        );
    })
})