export class Author{
    public readonly id: number; 
    public name: string;

    constructor(props: Omit<Author, 'id'>, id?: number){
        Object.assign(this, props); 
    }
}