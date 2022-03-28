import { CreateAuthorService } from "./CreateAuthorService";



const createSut = () => {
    return new CreateAuthorService(); 
}

describe('Testing CreateAuthorService class', ()=>{
    afterEach(() => jest.clearAllMocks());

    it('should create an Author', ()=>{
        const author
    })
})