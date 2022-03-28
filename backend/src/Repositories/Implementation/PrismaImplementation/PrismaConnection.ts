import { IDBConnectionInterface } from '../../IDBConnectionInterface';
import { PrismaClient } from '@prisma/client';

let prisma; 

export class PrismaConnection implements IDBConnectionInterface{
    Connect() {
        if(prisma)
            return prisma; 
        else
            return new PrismaClient(); 
    }
}