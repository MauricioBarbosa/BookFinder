import { CreateAuthorService } from "./CreateAuthorService";
import { AuthorPrismaRepository } from "../../../Repositories/Implementation/PrismaImplementation/AuthorPrismaRepository";
import { ICreateAuthorDTO } from "./ICreateAuthorDTO";

jest.mock("../../../Repositories/Implementation/PrismaImplementation/AuthorPrismaRepository");

const AuthorPrismaRepositoryMock = AuthorPrismaRepository as jest.Mock<AuthorPrismaRepository>; 

const createSut = () => {
    const authorPrismaRepositoryMock = createAuthorPrismaRepositoryMock()
    return new CreateAuthorService(authorPrismaRepositoryMock); 
}

const createAuthorPrismaRepositoryMock = () => {
    return new AuthorPrismaRepositoryMock(); 
}

const createAuthor = (name: string) => {
    class AuthorMock implements ICreateAuthorDTO {
      constructor(public name: string) {}
    }
  
    return new AuthorMock(name);
  };

describe('Testing CreateAuthorService class', ()=>{
    afterEach(() => jest.clearAllMocks());

    it('should create an Author', async ()=>{
        const sut = createSut();
        const author = createAuthor('Carlos Drummond De Andrade'); 

        expect(sut.run(author)).not.toThrowError(); 
    })

    it("shouldn't create an Author with name lenght lesser than 2 letter", async ()=>{
        const sut = createSut();
        const author = createAuthor('A'); 

        expect(sut.run(author)).toThrowError('Author name is too small'); 
    })

    it("shouldn't create an Author with name lenght bigger than 40 letters", async ()=>{
        const sut = createSut();
        const author = createAuthor('g8xQ2S6YpNNTFRB00AZ3OOs2fdxHaBRlc1FFsQnCM'); 

        expect(sut.run(author)).toThrowError('Author name is too big'); 
    })

    it("shouldn't create two Authors of the same name", async ()=>{
        const sut = createSut();
        const author1 = createAuthor('J.K Rowling'); 
        const author2 = createAuthor('J.K Rowling'); 

        expect(sut.run(author1)).not.toThrowError(); 
        expect(sut.run(author2)).toThrowError('Author already exists');
    })
})