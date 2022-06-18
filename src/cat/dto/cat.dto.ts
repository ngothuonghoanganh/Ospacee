import { ObjectId } from "mongodb";
import { BaseEntity } from "src/services/intefaces/base.interfaces";

export class CatDto implements BaseEntity {
    _id?: ObjectId
    name: string
    age: number
}