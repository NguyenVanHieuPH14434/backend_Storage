import { MongoDB } from "../lib/mongodb";
import { ShelfSchema } from "./shelf";

export class ShelfModel {
    constructor(private db : MongoDB){}

    async init(){}

    private col_shelf = this.db.collection('shelf');

    async ListShelf (){
        const docs = await this.col_shelf.find().toArray();
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

    async UpdateShelf (_id: string, shelf: ShelfSchema.UpdateShelfParams){
        const doc = await this.col_shelf.updateOne({_id:_id}, {$set: shelf});
        return doc;
    }

    async DeleteShelf (_id:string){
        const doc = await this.col_shelf.deleteOne({_id:_id});
        return doc;
    }
}