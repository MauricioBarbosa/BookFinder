import { Author } from './../../../Entities/Author';
import { prisma } from '../../../database/prisma/client';
import { IAuthorRepository } from '../../IAuthorRepository';

export class AuthorPrismaRepository implements IAuthorRepository{

    public async save(author: string): Promise<Author> {
        const createdAuthor = await prisma.author.create({
            data: {
                name: author
            }
        });
        
        return new Author({
            name: createdAuthor.name, 
        } , createdAuthor.id);
    }

    public async saveMany(authors: string[]): Promise<void> {
        const createdAuthors = await prisma.author.createMany({
            data: authors.map((author)=>{
                return { name: author }
            })
        })
    }

    public async updateAuthor(author: Author): Promise<Author> {
        const updatedAuthor = await prisma.author.update({
            data: {
                name: author.name
            }, 
            where: {
                id: author.id
            }
        })

        return new Author({
            name: updatedAuthor.name, 
        }, updatedAuthor.id);
    }

    public async findById(id: number): Promise<Author | null> {
        const foundAuthor = await prisma.author.findFirst({
            where: {
                id: id
            }
        })

        if(foundAuthor){
            return new Author({
                name: foundAuthor.name
            }, foundAuthor.id);
        }

        return null; 
    }

    public async findByName(name: string): Promise<Author[]> {
        const authors = await prisma.author.findMany({
            where: {
                name: {
                    startsWith: name
                }
            }
        })

        return authors.map((author)=>{
            return new Author({
                name: author.name, 
            }, author.id)
        })
    }

    public async findAll(): Promise<Author[]> {
        const authors = await prisma.author.findMany();
        
        return authors.map((author)=>{
            return new Author({
                name: author.name, 
            }, author.id)
        })
    }

    public async checkExists(name: string): Promise<boolean> {
        const author = await prisma.author.findFirst({
            where: {
                name: name
            }
        }); 

        return !!author; 
    }

    public async deleteAllAuthors(): Promise<void> {
        await prisma.author.deleteMany({});
    }

    public async deleteAuthor(id: number): Promise<void>{
        await prisma.author.delete({
            where: {
                id: id
            }
        })
    }
}