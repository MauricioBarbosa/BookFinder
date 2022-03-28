import { IDBConnectionInterface } from './IDBConnectionInterface';
import { Author } from "../Entities/Author";

export interface IAuthorRepository{ 
    findByName(name: string): Promise<any>; 
    save(author: Author): Promise<void>
}