import { IDBConnectionInterface } from '../../IDBConnectionInterface';
import { PrismaClient } from '@prisma/client';

let prisma; 

export class PrismaConnection implements IDBConnectionInterface{
    Connect() {
        if(!prisma){
            prisma = new PrismaClient(); 
        }
        return prisma;     
    }
}