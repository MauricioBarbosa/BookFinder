import { Category } from './../../../Entities/Category';
import { CategoryPrismaRepository } from "../../../Repositories/Implementation/prisma/CategoryPrismaRepository";
import { ReadCategoryService } from "./ReadCategoryService";

let categoryPrismaRepository: CategoryPrismaRepository;
let sut: ReadCategoryService;

beforeAll(async ()=>{
    categoryPrismaRepository = new CategoryPrismaRepository();
    sut = new ReadCategoryService(categoryPrismaRepository);
});

describe("Testing ReadCategoryService class runById method with Prisma", ()=>{

    let category: Category; 

    beforeAll(async ()=>{
        await categoryPrismaRepository.deleteAllCategories();
        category = await categoryPrismaRepository.save("Fiction");
    })

    it("it should throw an category not found error", async ()=>{
        await expect(sut.runById(category.id + 1)).rejects.toEqual(
            new Error("Category doesn't exist")
        );
    })

    it("it should return an category", async ()=>{
        await expect(sut.runById(category.id)).resolves.toEqual(
            new Category({
                name: "Fiction"
            }, category.id)
        );
    })
})

describe("Testing ReadCategoryService class run method", ()=>{

    let categories: Array<string>

    beforeAll(async ()=>{ 
        await categoryPrismaRepository.deleteAllCategories();
        categories = [
            "Romance", 
            "Responsabilities", 
            "Science", 
            "Physics"
        ]
        await categoryPrismaRepository.saveMany(categories); 
    })

    it("Should return all categories", async ()=>{
        expect((await sut.run())).toHaveLength(
            categories.length
        ); 
    })

    it("Should have a length equal 2: categories whose name starts with R", async ()=>{
        expect((await sut.run('R'))).toHaveLength(2);
    })

    it("Should return categories whose name starts with R", async ()=>{
        expect((await sut.run('R'))).toEqual(
            expect.arrayContaining([
                expect.objectContaining({name: "Romance"}), 
                expect.objectContaining({name: "Responsabilities"})
            ])
        )
    })
})