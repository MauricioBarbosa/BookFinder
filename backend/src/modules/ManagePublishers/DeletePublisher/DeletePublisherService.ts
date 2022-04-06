import { ICategoryRepository } from "../../../Repositories/ICategoryRepository";
import { IDeleteCategoryDTO } from "./IDeleteCategoryDTO";

export class DeleteCategoryService{
    constructor(private categoriesRepository: ICategoryRepository) {}

    async run(category: IDeleteCategoryDTO){
        const foundCategory = await this.categoriesRepository.findById(category.id);

        if(!foundCategory){
            throw new Error("Category doesn't exist"); 
        }

        await this.categoriesRepository.deleteCategory(foundCategory.id);
    }
}