import { WarehouseSchema } from './warehouse';
import { WarehouseModel } from './warehouse.model';
import dayjs from 'dayjs';

export class WarehouseController{
    constructor(private model:WarehouseModel){}

    async init(){}

    async GetAllWarehouse(){
        return this.model.GetAllWarehouse();
    }

    async exportWarehouse (fromDate:any, toDate:any){
        return this.model.exportWarehouse(fromDate, toDate)
    }

    async ListWarehouse(perPage:number, page: number){
       
        return this.model.ListWarehouse(perPage, page);
    }

    async searchWarehouse(filter:any, perPage:number, page: number){
       
        return this.model.searchWarehouse(filter, perPage, page);
    }

   
   

    async GetWarehouse (_id:string){
        const doc = await this.model.GetWarehouse(_id);
        return doc;
    }

    async CreateWarehouse (params: WarehouseSchema.CreateWarehouseParams){
        const now = dayjs();
      const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');

        const warehouse : WarehouseSchema.Warehouse = {
            _id: WarehouseSchema.Generator.NewWarehouseId(),
            producer_name: params.producer_name,
            product_name: params.product_name,
            lot_number: params.lot_number,
            ctime: nowFormat,
            utime: nowFormat
        };

        await this.model.CreateWarehouse(warehouse);
        return warehouse;
    }

    async CreateManyWarehouse (params:any){
        const now = dayjs();
      const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');
        const warehouse = params.map((item:any)=>({
            _id: WarehouseSchema.Generator.NewWarehouseId(),
            producer_name: item['Tên nhà cung cấp'],
            product_name: item['Tên hàng hóa'],
            lot_number: item['Số lô'],
            ctime: nowFormat,
            utime: nowFormat
        }))
        await this.model.CreateManyWarehouse(warehouse);
    }

    async UpdateWarehouse (_id:string, params:WarehouseSchema.UpdateWarehouseParams){
        const warehouse = {...params};
        const now = dayjs();
       
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');
        warehouse.utime = nowFormat;
        await this.model.UpdateWarehouse(_id, warehouse);
        return warehouse;
    }

    async DeleteWarehouse (_id:string){
        const doc = await this.GetWarehouse(_id);
        await this.model.DeleteWarehouse(_id);
        return doc;
    }

}