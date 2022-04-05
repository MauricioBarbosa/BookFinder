import { Role } from './Role';

export class User{
    public readonly id: number; 
    public username: string; 
    public userpassword: string; 
    public role: Role; 

    constructor(props: Omit<User, 'id'|'userpassword'>, id?: number, userpassword?: string){
        Object.assign(this, props); 

        if(id){
            this.id = id;
        }

        if(userpassword){
            this.userpassword = userpassword
        }
    }
}