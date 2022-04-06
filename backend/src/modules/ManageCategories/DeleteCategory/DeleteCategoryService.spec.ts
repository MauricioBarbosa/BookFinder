import { Category } from './../../../Entities/Category';
import { CategoryPrismaRepository } from "../../../Repositories/Implementation/prisma/CategoryPrismaRepository";
import { DeleteCategoryService } from "./DeleteCategoryService"

let categoryPrismaRepository: CategoryPrismaRepository;
let sut: DeleteCategoryService;

beforeAll(async () =>{
    categoryPrismaRepository = new CategoryPrismaRepository();
    sut = new DeleteCategoryService(categoryPrismaRepository);
})

describe('Testing DeleteCategoryService class with Prisma', ()=>{

    let category: Category;

    beforeAll(async ()=>{
        await categoryPrismaRepository.deleteAllCategories(); 
        category = await categoryPrismaRepository.save('Categoria de Teste');
    })

    it("it should throw category doesn't exist error", async ()=>{
        await expect(sut.run({
            id: -1
        })).rejects.toEqual(
            new Error("Category doesn't exist")
        );
    })

    it('Should delete a category', async ()=>{
        await sut.run({
            id: category.id
        });
        await expect(sut.run({
            id: category.id
        })).rejects.toEqual(
            new Error("Category doesn't exist")
        );
    })
})