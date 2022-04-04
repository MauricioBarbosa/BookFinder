import { Author } from "../../../Entities/Author";
import { AuthorPrismaRepository } from "../../../Repositories/Implementation/prisma/AuthorPrismaRepository";
import { UpdateAuthorService } from "./UpdateAuthorService";

let authorPrismaRepository: AuthorPrismaRepository;
let sut: UpdateAuthorService;

beforeAll(async ()=>{
    authorPrismaRepository = new AuthorPrismaRepository();
    sut = new UpdateAuthorService(authorPrismaRepository);
});

describe('Testing UpdateAuthorClass with Prisma', ()=>{
    let author: Author;

    beforeAll(async()=>{
        await authorPrismaRepository.deleteAllAuthors();
        author = await authorPrismaRepository.save("Jorge Amado"); 
    })

    it("Should throw author name too small error", async ()=>{
        await expect(sut.run({
            id: author.id, 
            name: "A"
        })).rejects.toEqual(
            new Error("Author name is too small")
        )
    })

    it("Should throw an Author name is too big error", async ()=>{
        await expect(sut.run({
            id: author.id, 
            name: "g8xQ2S6YpNNTFRB00AZ3OOs2fdxHaBRlc1FFsQnCM"
        })).rejects.toEqual(
            new Error("Author name is too big")
        )
    })

    it("Should throw author not found error", async ()=>{
        await expect(sut.run({
            id: author.id + 1, 
            name: "Jorge Amado Alterado"
        })).rejects.toEqual(
            new Error("Author not found")
        )
    })

    it("Should update an author", async ()=>{
        await expect(sut.run({
            id: author.id, 
            name: "Jorge Amado Alterado"
        })).resolves.toEqual(
            new Author({
                name: "Jorge Amado Alterado"
            }, author.id)
        )
    })
})