export class Category{
    public readonly id: number; 
    public name: string;

    constructor(props: Omit<Category, 'id'>, id?: number){
        Object.assign(this, props); 

        if(id){
            this.id = id;
        }
    }
}