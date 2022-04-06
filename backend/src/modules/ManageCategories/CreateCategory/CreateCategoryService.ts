import { Category } from './../../../Entities/Category';
import { ICategoryRepository } from '../../../Repositories/ICategoryRepository';
import { ICreateCategoryDTO } from './ICreateCategoryDTO';

export class CreateCategoryService{

    constructor(private categoriesRepository: ICategoryRepository) {}

    async run(category: ICreateCategoryDTO): Promise<Category>{
        if(category.name.length < 2){
            throw new Error("Category name is too small"); 
        }

        if(category.name.length > 40){
            throw new Error("Category name is too big"); 
        }
        
        const categoryExists = await this.categoriesRepository.checkExists(category.name);

        if(categoryExists){
            throw new Error("Category already exists"); 
        }

        return await this.categoriesRepository.save(category.name);
    }
}