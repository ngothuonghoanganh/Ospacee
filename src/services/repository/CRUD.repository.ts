import { BadRequestException, Inject } from "@nestjs/common";
import { Collection, Filter, FindOptions, MongoClient, OptionalUnlessRequiredId, WithId } from "mongodb";
import { BaseEntity } from "../intefaces/base.interfaces";
import * as moment from "moment"
export abstract class CRUDRepository<T extends BaseEntity = any> {
    collectionName
    @Inject('DATABASE_CONNECTION')
    private Client: MongoClient

    constructor(
        collectionName: string
    ) {
        this.collectionName = collectionName
    }


    protected get collection(): Collection<T> {
        if (!this.collectionName) {
            throw new BadRequestException("collection_name_is_undefined")
        }

        return this.Client.db("test").collection<T>(this.collectionName)
    }

    async find(filter: Filter<T>, optionns?: FindOptions): Promise<WithId<T>[]> {
        return this.collection.find(filter, optionns).toArray()
    }

    async findOne(filter: Filter<T>, optionns?: FindOptions): Promise<WithId<T>> {
        return this.collection.findOne(filter, optionns)
    }

    async create(data: OptionalUnlessRequiredId<T>): Promise<WithId<T>> {
        const insertData = await this.collection.insertOne({ ...data, createdAt: moment().toISOString(), updatedAt: moment().toISOString() })
        return this.collection.findOne({ _id: insertData.insertedId as Filter<T> })
    }
} 