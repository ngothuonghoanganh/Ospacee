import { Module } from "@nestjs/common";
import { Db, MongoClient } from "mongodb";

@Module({
    providers: [{
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<MongoClient> => {
            try {
                const client = await MongoClient.connect('mongodb+srv://Ospacee:JK3zTK5xC3KPbrST@ospacee.jnvnv.mongodb.net', {});
                return client
            } catch (e) {
                throw e;
            }
        }
    },],
    exports: ['DATABASE_CONNECTION'],
})
export class MongoDbModule { }