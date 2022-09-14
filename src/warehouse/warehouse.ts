import rand from "../lib/rand";

export namespace WarehouseSchema{
    export interface Warehouse {
        _id: string;
        producer_name: string;
        product_name:string;
        lot_number:string;
        ctime:string;
        utime:string;
    }

    export interface CreateWarehouseParams {
        producer_name: string;
        product_name:string;
        lot_number:string;
    }

    export interface UpdateWarehouseParams {
        producer_name?: string;
        product_name?:string;
        lot_number?:string;
        utime?:string
    }

    export const Generator = {
        NewWarehouseId:() => rand.alphabet(14)
    }
}