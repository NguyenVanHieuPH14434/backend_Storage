import { MongoDB } from "../lib/mongodb";
import { ProducerSchema } from "./producer";

export class ProducerModel{
    constructor(private db: MongoDB){}

    async init (){}

    private col_producer = this.db.collection('producer');

    async GetAllProducer (){
        const docs = await this.col_producer.find().toArray();
        return docs;
    }

    async ListProducer (perPage:number, page:number){
        const docs = await this.col_producer.aggregate([{$sort:{ctime: -1}}]).skip((page * perPage)-perPage).limit(perPage).toArray();
        const count = await this.col_producer.find().count();
        const totalPage = Math.ceil(count/perPage);
        return {docs:docs, count:count, totalPage:totalPage};
    }

    async searchProducer (filter:any, perPage:number, page:number){
        const docs = await this.col_producer.find({$or:[{_id:filter}, {producer_name:filter}]}).sort({ctime:-1}).skip((page * perPage)-perPage).limit(perPage).toArray();
        const count = await this.col_producer.find().count();
        const totalPage = Math.ceil(count/perPage);
        return {docs:docs, count:count, totalPage:totalPage};
    }

    async exportProducer (fromDate:string, toDate:string){
        const docs = await this.col_producer.find({ctime:{$gte:fromDate, $lte:toDate}}).toArray();
        return docs;
    }

    async GetProducer (_id: string) {
        const doc = await this.col_producer.findOne({_id:_id});
        return doc;
    }

    async CreateProducer (producer: ProducerSchema.CreateProducerParams){
        const doc = await this.col_producer.insertOne(producer);
        return doc;
    }

    async CreateManyProducer (producer:any){
        const  docs = await this.col_producer.insertMany(producer);
        return docs;
    }

    async UpdateProducer (_id: string, producer: ProducerSchema.UpdateProducerParams){
        const doc = await this.col_producer.updateOne({_id:_id}, {$set:producer});
        return doc;
    }

    async DeleteProducer (_id: string){
        const doc = await this.col_producer.deleteOne({_id:_id});
        return doc;
    }
}