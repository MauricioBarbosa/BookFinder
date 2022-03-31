import { AuthorPrismaRepository } from './../prisma/AuthorPrismaRepository';

const createSUT = () =>{
    return new AuthorPrismaRepository(); 
}

describe('Testing Author Repository', ()=>{

    it('should create an author', async ()=>{
        const sut = createSUT(); 
        await expect(sut.save('José Maria Ribeiro')).resolves; 
    })

    it('should find an author', async ()=>{
        const sut = createSUT(); 
        await expect(sut.checkExists('José Maria Ribeiro')).resolves.toBe(true); 
    })
})