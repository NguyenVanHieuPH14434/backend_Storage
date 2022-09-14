import { MongoDB } from "../lib/mongodb";
import { ProducerSchema } from "./producer";

export class ProducerModel{
    constructor(private db: MongoDB){}

    async init (){}

    private col_producer = this.db.collection('producer');

    async ListProducer (){
        const docs = await this.col_producer.find().toArray();
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

    async UpdateProducer (_id: string, producer: ProducerSchema.UpdateProducerParams){
        const doc = await this.col_producer.updateOne({_id:_id}, {$set:producer});
        return doc;
    }

    async DeleteProducer (_id: string){
        const doc = await this.col_producer.deleteOne({_id:_id});
        return doc;
    }
}