import { prisma } from '../../../database/prisma/client';
import { Category } from '../../../Entities/Category';
import { ICategoryRepository } from './../../ICategoryRepository';

export class CategoryPrismaRepository implements ICategoryRepository{
    
    async checkExists(name: string): Promise<boolean> {
        const category = await prisma.category.findFirst({
            where: {
                name: name
            }
        }); 

        return !!category; 
    }

    async save(category: string): Promise<Category> {
        const createdCategory = await prisma.category.create({
            data: {
                name: category
            }
        });
        
        return new Category({
            name: createdCategory.name, 
        } , createdCategory.id);
    }

    async saveMany(categories: string[]): Promise<void> {
        const createdCategories = await prisma.category.createMany({
            data: categories.map((category)=>{
                return { name: category }
            })
        })
    }

    async findAll(): Promise<Category[]> {
        const categories = await prisma.category.findMany();
        
        return categories.map((category)=>{
            return new Category({
                name: category.name, 
            }, category.id)
        })
    }

    async findById(id: number): Promise<Category | null> {
        const foundCategory = await prisma.category.findFirst({
            where: {
                id: id
            }
        })

        if(foundCategory){
            return new Category({
                name: foundCategory.name
            }, foundCategory.id);
        }

        return null;
    }

    async findByName(name: string): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            where: {
                name: {
                    startsWith: name
                }
            }
        })

        return categories.map((category)=>{
            return new Category({
                name: category.name, 
            }, category.id)
        })
    }

    async updateCategory(category: Category): Promise<Category> {
        const updatedCategory = await prisma.category.update({
            data: {
                name: category.name
            }, 
            where: {
                id: category.id
            }
        })

        return new Category({
            name: updatedCategory.name, 
        }, updatedCategory.id);
    }

    async deleteAllCategories(): Promise<void> {
        await prisma.category.deleteMany({});
    }

    async deleteCategory(id: number) {
        await prisma.category.delete({
            where: {
                id: id
            }
        })
    }
}