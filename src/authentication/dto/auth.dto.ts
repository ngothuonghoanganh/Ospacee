import { ObjectId } from "mongodb";
import { BaseEntity } from "src/services/intefaces/base.interfaces";


export class AuthDto implements BaseEntity {
    _id?: ObjectId;
    username: string;
    password: string;
    name: string;
    age: number;
    createdAt?: Date;
    updatedAt?: Date;
}