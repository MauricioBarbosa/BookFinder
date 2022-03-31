import { AuthorPrismaRepository } from '../../../Repositories/Implementation/prisma/AuthorPrismaRepository';
import { IAuthorRepository } from '../../../Repositories/IAuthorRepository';
import { CreateAuthorService } from "./CreateAuthorService";
import { ICreateAuthorDTO } from "./ICreateAuthorDTO";

const createSut = (authorRepository : IAuthorRepository) => {
    return new CreateAuthorService(authorRepository); 
}

const createAuthor = (name: string) => {
    class AuthorMock implements ICreateAuthorDTO {
      constructor(public name: string) {}
    }
  
    return new AuthorMock(name);
};

describe('Testing CreateAuthorService class with Prisma', ()=>{

    let authorPrismaRepository: AuthorPrismaRepository; 

    beforeAll(()=>{
        authorPrismaRepository = new AuthorPrismaRepository(); 
    })

    afterEach(() => jest.clearAllMocks());

    it('should create an Author', async ()=>{
        const sut = createSut(authorPrismaRepository);
        const author = createAuthor('J.K Rowling'); 

        await expect(sut.run(author)).resolves; 
    })

    it("shouldn't create an Author with name lenght lesser than 2 letter", async ()=>{
        const sut = createSut(authorPrismaRepository);
        const author = createAuthor('A'); 

        await expect(sut.run(author)).rejects.toEqual(
            new Error('Author name is too small')
        )
    })

    it("shouldn't create an Author with name lenght bigger than 40 letters", async ()=>{
        const sut = createSut(authorPrismaRepository);
        const author = createAuthor('g8xQ2S6YpNNTFRB00AZ3OOs2fdxHaBRlc1FFsQnCM'); 

        await expect(sut.run(author)).rejects.toEqual(
            new Error('Author name is too big')
        )
    })

    it("shouldn't create two Authors of the same name", async ()=>{
        const sut = createSut(authorPrismaRepository);
        const author1 = createAuthor("Carlos Drummond De Andrade"); 
        const author2 = createAuthor("Carlos Drummond De Andrade"); 

        await sut.run(author1);  
        await expect(sut.run(author2)).rejects.toEqual(
            new Error("Author already exists")
        );
    })
})