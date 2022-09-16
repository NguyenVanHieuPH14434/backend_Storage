import { MongoDB } from "../lib/mongodb";
import { StorageSchema } from "./storage";

export class StorageModel {
    constructor(private db:MongoDB){}

    async init(){}

    private col_storage = this.db.collection('storage');

    async ListStorage (filter:any){
        const docs = await this.col_storage.aggregate([{$match:filter}, {$sort:{ctime: -1}}]).toArray();
        const count = await this.col_storage.find().count();
        return {docs:docs, count:count};
    }

    async GetStorage (_id:string){
        const doc = await this.col_storage.findOne({_id:_id});
        return doc;
    }

    async CreateStorage (storage : StorageSchema.CreateStorageParams){
        const doc = await this.col_storage.insertOne(storage);
        return doc;
    }

    async UpdateStorage (_id:string, storage : StorageSchema.UpdateStorageParams){
        const doc = await this.col_storage.updateOne({_id:_id}, {$set: storage});
        return doc;
    }

    async DeleteStorage (_id:string){
        const doc = await this.col_storage.deleteOne({_id:_id});
        return doc;
    }
}