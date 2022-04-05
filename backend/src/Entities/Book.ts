import { Cover } from './Cover';
import { Publisher } from './Publisher';
import { Author } from './Author';
import { Category } from './Category';

export class Book{
    public readonly id: number; 
    public title: string;
    public description: string; 
    public cover: Cover;
    public publisher: Publisher; 
    public category: Category; 
    public author: Author; 
    public comments: Array<Comment>

    constructor(props: Omit<Book, 'id'|'cover'|'comments'>, 
    id?: number, cover?: Cover, comments?: Array<Comment>){
        Object.assign(this, props); 

        if(id){
            this.id = id;
        }

        if(cover){
            this.cover = cover;
        }

        if(comments){
            this.comments = comments;
        }
    }
}