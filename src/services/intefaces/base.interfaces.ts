import { ObjectId } from "mongodb"

export interface AuditingEntity {
   createdAt?: Date
   updatedAt?: Date
}

export interface BaseEntity extends AuditingEntity{
    _id?: ObjectId
}

export type Nullable<T> = T | null;