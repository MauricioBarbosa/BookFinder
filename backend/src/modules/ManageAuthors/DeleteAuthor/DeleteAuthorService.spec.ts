import { Author } from './../../../Entities/Author';
import { AuthorPrismaRepository } from "../../../Repositories/Implementation/prisma/AuthorPrismaRepository";
import { DeleteAuthorService } from "./DeleteAuthorService"

const createSUT = (authorPrismaRepository: AuthorPrismaRepository) => {
    return new DeleteAuthorService(authorPrismaRepository);
}

describe('Testing DeleteAuthorService class with Prisma', ()=>{

    let authorPrismaRepository: AuthorPrismaRepository;
    let author: Author;

    beforeAll(async ()=>{
        authorPrismaRepository = new AuthorPrismaRepository();
        await authorPrismaRepository.deleteAllAuthors(); 
        author = await authorPrismaRepository.save('Author de Teste');
    })

    it("it should throw author doesn't exist error", async ()=>{
        const sut = createSUT(authorPrismaRepository); 
        await expect(sut.run({
            id: -1
        })).rejects.toEqual(
            new Error("Author doesn't exist")
        );
    })

    it('Should delete an author', async ()=>{
        const sut = createSUT(authorPrismaRepository); 
        console.log(author);
        await sut.run({
            id: author.id
        });
        await expect(sut.run({
            id: author.id
        })).rejects.toEqual(
            new Error("Author doesn't exist")
        );
    })
})