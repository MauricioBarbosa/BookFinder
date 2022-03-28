import { IAuthorRepository } from './../../../Repositories/IAuthorRepository';
import { ICreateAuthorDTO } from './ICreateAuthorDTO';

export class CreateAuthorService{
    private authorsRepository: IAuthorRepository;

    constructor(props: IAuthorRepository){
        Object.assign(props);
    }

    async run(author: ICreateAuthorDTO){
        
    }
}