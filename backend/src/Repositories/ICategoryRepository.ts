import { Category } from './../Entities/Category';

export interface ICategoryRepository{
    save(category: string): Promise<Category>;
    saveMany(categories: Array<string>): Promise<void> 
    checkExists(name: string): Promise<boolean>; 
    findByName(name: string): Promise<Array<Category>>
    findAll(): Promise<Array<Category>>
    findById(id: number): Promise<Category | null>
    updateCategory(category: Category): Promise<Category>
    deleteAllCategories(): Promise<void>;
    deleteCategory(id: number); 
}