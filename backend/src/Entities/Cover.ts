export class Cover{
    public book_id: number; 
    public filename: string
    public originalname: string; 

    constructor(props: Cover){
        Object.assign(this, props)
    }
}