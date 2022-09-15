import { from } from 'form-data';
import { ProducerSchema } from './producer';
import { ProducerModel } from './producer.model';
import dayjs from 'dayjs';
export class ProducerController {
    constructor(private model: ProducerModel){}

    async init(){}

    async ListProducer (filter:any, perPage:number, page:number){
        return this.model.ListProducer(filter, perPage, page);
    }

    async GetProducer (_id :string){
        const doc = await this.model.GetProducer(_id);
        return doc;
    }

    async CreateProducer (params: ProducerSchema.CreateProducerParams){
        const now = dayjs();
      
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');

        const producer : ProducerSchema.Producer = {
            _id: ProducerSchema.Generator.NewProducerId(),
            producer_name: params.producer_name,
            producer_address: params.producer_address,
            producer_email: params.producer_email,
            producer_phone: params.producer_phone,
            ctime: nowFormat,
            utime: nowFormat
        };

        await this.model.CreateProducer(producer);
        return producer;
    }

    async UpdateProducer (_id:string, params: ProducerSchema.UpdateProducerParams){
        const producer = {...params};
        const now = dayjs();

        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');
        producer.utime = nowFormat;
        await this.model.UpdateProducer(_id, producer);
        return producer;     
    }

    async DeleteProducer (_id: string){
        const producer = await this.GetProducer(_id);
        await this.model.DeleteProducer(_id);
        return producer;
    }
}