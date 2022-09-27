import { MongoDB } from "../lib/mongodb";
import { WarehouseSchema } from "./warehouse";

export class WarehouseModel{
    constructor(private db:MongoDB){}

    async init () {}

    private col_warehouse = this.db.collection('warehouse');

    async GetAllWarehouse () {
        const docs = await this.col_warehouse.find().toArray();
        return docs;
    }

    async ListWarehouse (perPage:number, page:number){
        const docs = await this.col_warehouse.find().sort({ctime: -1}).skip((perPage * page) - perPage).limit(perPage).toArray();
        const count = await this.col_warehouse.find().count();
        const totalPage = Math.ceil(count/perPage);
        return {docs:docs, count:count, totalPage:totalPage};
    }

    async searchWarehouse (filter:any, perPage:number, page:number){
        const docs = await this.col_warehouse.find({$or:[{_id:filter}, {product_name:filter},{ctime:filter}]}).sort({ctime: -1}).skip((perPage * page) - perPage).limit(perPage).toArray();
        const count = await this.col_warehouse.find().count();
        const totalPage = Math.ceil(count/perPage);
        return {docs:docs, count:count, totalPage:totalPage};
    }

    async exportWarehouse (fromDate:string, toDate:string){
        const docs = await this.col_warehouse.find({ctime:{$gte:fromDate, $lte:toDate}}).toArray();
        return docs;
    }

    async GetWarehouse (_id:string){
        const doc = await this.col_warehouse.findOne({_id:_id});
        return doc;
    }

    async CreateWarehouse (warehouse: WarehouseSchema.CreateWarehouseParams){
        const doc = await this.col_warehouse.insertOne(warehouse);
        return doc;
    }

    async CreateManyWarehouse (warehouse:any){
        const docs = await this.col_warehouse.insertMany(warehouse);
        return docs;
    }

    async UpdateWarehouse (_id: string, warehouse: WarehouseSchema.UpdateWarehouseParams){
        const doc = await this.col_warehouse.updateOne({_id:_id},{$set:warehouse});
        return doc;
    }

    async DeleteWarehouse (_id:string){
        const doc = await this.col_warehouse.deleteOne({_id:_id});
        return doc;
    }
}