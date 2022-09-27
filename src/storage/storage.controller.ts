import { StorageSchema } from './storage';
import { StorageModel } from './storage.model';
import dayjs from 'dayjs';
import QRCode from "qrcode";

export class StorageController {
    constructor(private model : StorageModel){}

    async init() {}

    async GetAllStorage (){
        return this.model.GetAllStorage();
    }

    async exportStorage (fromDate:any, toDate:any){
        return this.model.exportStorage(fromDate, toDate);
    }

    async ListStorage () {
        return this.model.ListStorage();
    }

    async searchStorage (filter:any) {
        return this.model.searchStorage(filter);
    }

    async GetStorage (_id:string){
        const doc = await this.model.GetStorage(_id);
        return doc;
    }

    async CreateStorage (params : StorageSchema.CreateStorageParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');

        const data = params.product_name + '|' + params.lot_number + '|' + params.quantity + '|' + params.shelf_number + '|' + params.type + '|' + params.nsx + '|' + params.hsd; 

       const qr_code = await QRCode.toDataURL(data);

        const storage : StorageSchema.Storage = {
            _id: StorageSchema.Generate.NewStorageId(),
            lot_number: params.lot_number,
            product_name: params.product_name,
            shelf_number: params.shelf_number,
            type: params.type,
            quantity: params.quantity,
            qr_code: qr_code,
            nsx: params.nsx,
            hsd: params.hsd,
            ctime: nowFormat,
            utime: nowFormat
        }

        await this.model.CreateStorage(storage);
        return storage;
    }


    async UpdateStorage (_id:string, params: StorageSchema.UpdateStorageParams){
        const now = dayjs();
        
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');
        const data = params.product_name + '|' + params.lot_number + '|' + params.quantity + '|' + params.shelf_number + '|' + params.type + '|' + params.nsx + '|' + params.hsd; 
       const qr_code = await QRCode.toDataURL(data);
       const storage = {...params};
       storage.utime = nowFormat;
       storage.qr_code = qr_code;
        await this.model.UpdateStorage(_id, storage);
        return storage;
    }

    async DeleteStorage (_id:string){
        const doc = await this.GetStorage(_id);
        await this.model.DeleteStorage(_id);
        return doc;
    }

}