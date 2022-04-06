import { Category } from "../../../Entities/Category";
import { CategoryPrismaRepository } from "../../../Repositories/Implementation/prisma/CategoryPrismaRepository";
import { UpdateCategoryService } from "./UpdateCategoryService";

let categoryPrismaRepository: CategoryPrismaRepository;
let sut: UpdateCategoryService;

beforeAll(async ()=>{
    categoryPrismaRepository = new CategoryPrismaRepository();
    sut = new UpdateCategoryService(categoryPrismaRepository);
});

describe('Testing UpdateCategoryClass with Prisma', ()=>{
    let category: Category;

    beforeAll(async()=>{
        await categoryPrismaRepository.deleteAllCategories();
        category = await categoryPrismaRepository.save("Science Fiction"); 
    })

    it("Should throw category name too small error", async ()=>{
        await expect(sut.run({
            id: category.id, 
            name: "A"
        })).rejects.toEqual(
            new Error("Category name is too small")
        )
    })

    it("Should throw an Category name is too big error", async ()=>{
        await expect(sut.run({
            id: category.id, 
            name: "g8xQ2S6YpNNTFRB00AZ3OOs2fdxHaBRlc1FFsQnCM"
        })).rejects.toEqual(
            new Error("Category name is too big")
        )
    })

    it("Should throw category not found error", async ()=>{
        await expect(sut.run({
            id: category.id + 1, 
            name: "Science Fiction Changed"
        })).rejects.toEqual(
            new Error("Category not found")
        )
    })

    it("Should update an category", async ()=>{
        await expect(sut.run({
            id: category.id, 
            name: "Science Fiction Changed"
        })).resolves.toEqual(
            new Category({
                name: "Science Fiction Changed"
            }, category.id)
        )
    })
})