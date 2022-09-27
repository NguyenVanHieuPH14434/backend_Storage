import { MongoDB } from "../lib/mongodb";
import { StorageSchema } from "./storage";

export class StorageModel {
    constructor(private db:MongoDB){}

    async init(){}

    private col_storage = this.db.collection('storage');

    async GetAllStorage (){
        const docs = await this.col_storage.find().toArray();
        return docs;
    }

    async ListStorage (){
        const docs = await this.col_storage.aggregate([{$sort:{ctime: -1}}]).toArray();
        const count = await this.col_storage.find().count();
        return {docs:docs, count:count};
    }

    async searchStorage (filter:any){
        const docs = await this.col_storage.find({$or:[{_id:filter}, {product_name:filter}, {ctime:filter}]}).sort({ctime:-1}).toArray();
        const count = await this.col_storage.find().count();
        return {docs:docs, count:count};
    }

    async exportStorage (fromDate:string, toDate:string){
        const docs = await this.col_storage.find({ctime:{$gte:fromDate, $lte:toDate}}).toArray();
        return docs;
    }

    async GetStorage (_id:string){
        const doc = await this.col_storage.findOne({_id:_id});
        return doc;
    }

    async CreateStorage (storage : StorageSchema.CreateStorageParams){
        const doc = await this.col_storage.insertOne(storage);
        return doc;
    }

    async CreateManyStorage (storage:any){
        const docs = await this.col_storage.insertMany(storage);
        return docs;
    }

    async UpdateStorage (_id:string, storage : StorageSchema.UpdateStorageParams){
        const doc = await this.col_storage.updateOne({_id:_id}, {$set: storage});
        return doc;
    }

    async UpdateManyStorage (_id:string, storage : StorageSchema.UpdateStorageParams){
        const doc = await this.col_storage.updateMany({_id:_id}, {$set: {storage}});
        return doc;
    }

    async DeleteStorage (_id:string){
        const doc = await this.col_storage.deleteOne({_id:_id});
        return doc;
    }
}