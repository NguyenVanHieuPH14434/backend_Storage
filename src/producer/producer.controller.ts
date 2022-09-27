import { from } from 'form-data';
import { ProducerSchema } from './producer';
import { ProducerModel } from './producer.model';
import dayjs from 'dayjs';
export class ProducerController {
    constructor(private model: ProducerModel){}

    async init(){}

    async GetAllProducer () {
        return this.model.GetAllProducer();
    }

    async exportProducer (fromDate:any, toDate:any){
        return this.model.exportProducer(fromDate, toDate);
    }

    async ListProducer (perPage:number, page:number){
        return this.model.ListProducer(perPage, page);
    }

    async searchProducer (filter:any, perPage:number, page:number){
        return this.model.searchProducer(filter, perPage, page);
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

    async CreateManyProducer (params: any){
        const now = dayjs();
      
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');

        const producer = params.map((item:any)=>({
            _id: ProducerSchema.Generator.NewProducerId(),
            producer_name: item['Tên nhà cung cấp'],
            producer_address: item['Địa chỉ'],
            producer_email: item['Email'],
            producer_phone: item['SĐT'],
            ctime: nowFormat,
            utime: nowFormat
        }))

        await this.model.CreateManyProducer(producer);
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