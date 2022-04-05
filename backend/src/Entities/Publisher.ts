export class Publisher{
    public readonly id: number; 
    public name: string;

    constructor(props: Omit<Publisher, 'id'>, id?: number){
        Object.assign(this, props); 

        if(id){
            this.id = id;
        }
    }
}