import { Book } from './Book';
import { User } from './User';

export class Comment{
    public user: User; 
    public book: Book; 

    constructor(props: Comment){
        Object.assign(this, props);
    }
}