import { Role } from './Role';

export class User{
    public readonly id: number; 
    public username: string; 
    public userpassword: string;
    public salt: string; 
    public role: Role; 

    constructor(props: Omit<User, 'id'|'userpassword'|'salt'>, 
    id?: number, 
    userpassword?: string,
    salt?: string
    ){
        Object.assign(this, props); 

        if(id){
            this.id = id;
        }

        if(userpassword){
            this.userpassword = userpassword;
        }

        if(salt){
            this.salt = salt;
        }
    }
}