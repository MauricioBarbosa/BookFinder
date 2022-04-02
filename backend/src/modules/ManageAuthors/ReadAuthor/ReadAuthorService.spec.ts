import { Author } from "../../../Entities/Author";
import { AuthorPrismaRepository } from "../../../Repositories/Implementation/prisma/AuthorPrismaRepository";
import { ReadAuthorService } from "./ReadAuthorService";

let authorPrismaRepository: AuthorPrismaRepository;
let sut: ReadAuthorService;

beforeAll(async ()=>{
    authorPrismaRepository = new AuthorPrismaRepository();
    sut = new ReadAuthorService(authorPrismaRepository);
});

describe("Testing ReadAuthorService class runById method with Prisma", ()=>{

    let author: Author; 

    beforeAll(async ()=>{
        await authorPrismaRepository.deleteAllAuthors();
        author = await authorPrismaRepository.save("Ariano Suassuna");
    })

    it("it should throw an author not found error", async ()=>{
        await expect(sut.runById(author.id + 1)).rejects.toEqual(
            new Error("Author doesn't exist")
        );
    })

    it("it should return an author", async ()=>{
        await expect(sut.runById(author.id)).resolves.toEqual(
            new Author({
                name: "Ariano Suassuna"
            }, author.id)
        );
    })
})

describe("Testing ReadAuthorService class runByName method", ()=>{

    let authors: Array<string>

    beforeAll(async ()=>{ 
        await authorPrismaRepository.deleteAllAuthors();
        authors = [
            "Carlos Drummond De Andrade", 
            "Clarice Lispector", 
            "Jorge Amado", 
            "Manuel Bandeira"
        ]
        await authorPrismaRepository.saveMany(authors); 
    })

    it("Should return all authors", async ()=>{
        expect((await sut.run())).toHaveLength(
            authors.length
        ); 
    })

    it("Should have a length equal 2: authors whose name starts with C", async ()=>{
        expect((await sut.run('c'))).toHaveLength(2);
    })

    it("Should return authors whose name starts with C", async ()=>{
        expect((await sut.run('c'))).toEqual(
            expect.arrayContaining([
                expect.objectContaining({name: "Carlos Drummond De Andrade"}), 
                expect.objectContaining({name: "Clarice Lispector"})
            ])
        )
    })
})