import { MongoDB } from "../lib/mongodb";
import { ShelfSchema } from "./shelf";

export class ShelfModel {
    constructor(private db : MongoDB){}

    async init(){}

    private col_shelf = this.db.collection('shelf');

    async GetAllShelf (){
        const docs = await this.col_shelf.find().toArray();
        return docs;
    }
    async ListShelf ( perPage:number, page:number){
        const docs = await this.col_shelf.aggregate([{$sort:{ctime: -1}}]).skip((perPage * page)- perPage).limit(perPage).toArray();
        const count = await this.col_shelf.find().count();
        const totalPage = Math.ceil(count/perPage);
        return {docs:docs, count:count, totalPage: totalPage};
    }

    async searchShelf (filter:any, perPage:number, page:number){
        const docs = await this.col_shelf.find({$or:[{_id:filter}, {shelf_name:filter}]}).sort({ctime:-1}).skip((perPage * page)- perPage).limit(perPage).toArray();
        const count = await this.col_shelf.find().count();
        const totalPage = Math.ceil(count/perPage);
        return {docs:docs, count:count, totalPage: totalPage};
    }

    async exportShelf (fromDate:string, toDate:string) {
        const docs = await this.col_shelf.find({ctime:{$gte:fromDate, $lte:toDate}}).toArray();
        return docs;
    }

    async GetShelf (_id:string) {
        const doc = await this.col_shelf.findOne({_id:_id});
        return doc;
    }

    async CreateShelf (shelf: ShelfSchema.CreateShelfParams){
        const doc = await this.col_shelf.insertOne(shelf);
        return doc;
    }

    async CreateManyShelf (shelf: any){
        const doc = await this.col_shelf.insertMany(shelf);
        return doc;
    }

    async UpdateShelf (_id: string, shelf: ShelfSchema.UpdateShelfParams){
        const doc = await this.col_shelf.updateOne({_id:_id}, {$set: shelf});
        return doc;
    }

    async DeleteShelf (_id:string){
        const doc = await this.col_shelf.deleteOne({_id:_id});
        return doc;
    }

    async ImportShelf (shelf:any){
        const docs = await this.col_shelf.insertMany(shelf);
        return docs;
    }
}