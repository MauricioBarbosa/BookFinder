import { Category } from './../../../Entities/Category';
import { CategoryPrismaRepository } from "../../../Repositories/Implementation/prisma/CategoryPrismaRepository";
import { CreateCategoryService } from "./CreateCategoryService";

let categoryPrismaRepository: CategoryPrismaRepository;
let sut: CreateCategoryService;

beforeAll(async () =>{
    categoryPrismaRepository = new CategoryPrismaRepository();
    sut = new CreateCategoryService(categoryPrismaRepository);
})

describe('Testing CreateCategoryService class with Prisma', ()=>{

    beforeAll(async()=>{
        await categoryPrismaRepository.deleteAllCategories();
    })

    it('should create an Author', async ()=>{
        await expect(sut.run({
            name: "Comedy"
        })).resolves.toEqual(expect.objectContaining({
            id: expect.any(Number), 
            name: expect.any(String), 
        }))
    })

    it("shouldn't create a Category with name lenght lesser than 2 letters", async ()=>{
        await expect(sut.run({
            name: "a"
        })).rejects.toEqual(
            new Error('Category name is too small')
        )
    })

    it("shouldn't create a Category with name lenght bigger than 40 letters", async ()=>{
        await expect(sut.run({
            name: "g8xQ2S6YpNNTFRB00AZ3OOs2fdxHaBRlc1FFsQnCM"
        })).rejects.toEqual(
            new Error('Category name is too big')
        )
    })

    it("shouldn't create two Categories of the same name", async ()=>{
        await sut.run({
            name: "Horror"
        });  
        await expect(sut.run({
            name: "Horror"
        })).rejects.toEqual(
            new Error("Category already exists")
        );
    })
})