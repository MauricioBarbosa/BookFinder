import { Category } from '../../../Entities/Category';
import { ICategoryRepository } from '../../../Repositories/ICategoryRepository';
import { IUpdateCategoryDTO } from './IUpdateCategoryDTO';

export class UpdateCategoryService{
    constructor(private categoriesRepository: ICategoryRepository) {}

    async run(category: IUpdateCategoryDTO){
        if(category.name.length < 2){
            throw new Error("Category name is too small");
        }

        if(category.name.length > 40){
            throw new Error("Category name is too big");
        }

        const categoryExists = await this.categoriesRepository.findById(category.id);

        if(!categoryExists){
            throw new Error("Category not found");
        }

        return this.categoriesRepository.updateCategory(new Category({
            name: category.name
        }, category.id));
    }
}