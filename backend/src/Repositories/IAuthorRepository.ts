export interface IAuthorRepository{ 
    checkExists(name: string): Promise<boolean>; 
    save(author: string): Promise<void>
}