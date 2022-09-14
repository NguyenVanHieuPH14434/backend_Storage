import rand from "../lib/rand";

export namespace StorageSchema {
    export interface Storage {
        _id: string;
        lot_number: string;
        product_name: string;
        shelf_number: string;
        type: string;
        quantity: number;
        qr_code: string;
        nsx:string;
        hsd:string;
        ctime:string;
        utime:string;
    }

    export interface CreateStorageParams {
        lot_number: string;
        product_name: string;
        shelf_number: string;
        type: string;
        quantity: number;
        nsx:string;
        hsd:string;
    }

    export interface UpdateStorageParams {
        lot_number?: string;
        product_name?: string;
        shelf_number?: string;
        type?: string;
        quantity?: number;
        qr_code?: string;
        nsx?:string;
        hsd?:string;
        utime?:string
    }

    export const Generate = {
        NewStorageId: () => rand.uppercase(14)
    }
}
