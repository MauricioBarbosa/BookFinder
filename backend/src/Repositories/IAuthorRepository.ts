import { Author } from './../Entities/Author';

export interface IAuthorRepository{ 
    checkExists(name: string): Promise<boolean>; 
    save(author: string): Promise<Author>;
    saveMany(authors: Array<string>): Promise<void>
    updateAuthor(author: Author): Promise<Author>
    deleteAllAuthors(): Promise<void>;
    findById(id: number): Promise<Author | null>
    deleteAuthor(id: number); 
    findByName(name: string): Promise<Array<Author>>
    findAll(): Promise<Array<Author>>
}