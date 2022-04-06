import { Category } from "../../../Entities/Category";
import { ICategoryRepository } from "../../../Repositories/ICategoryRepository";

export class ReadCategoryService{
    constructor(private categoriesRepository: ICategoryRepository) {}

    async runById(id: number): Promise<Category>{
        const category = await this.categoriesRepository.findById(id);

        if(!category){
            throw new Error("Category doesn't exist"); 
        }

        return category; 
    }

    async run(name?: string): Promise<Array<Category>>{
        if(name)
            return await this.categoriesRepository.findByName(name);
        return this.categoriesRepository.findAll();
    }
}