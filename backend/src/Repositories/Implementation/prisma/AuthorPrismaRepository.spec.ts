import { AuthorPrismaRepository } from './AuthorPrismaRepository';

const createSUT = () => {
    return new AuthorPrismaRepository();
}

describe('Testing AuthorPrismaRepository with prisma', ()=>{

    it('Should check if author exists', async ()=>{
        const sut = createSUT(); 
        
        await sut.save('José Bernardo'); 
        await expect(sut.checkExists('José Bernardo')).resolves.toBe(true); 
    })
})