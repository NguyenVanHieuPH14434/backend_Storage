import rand from "../lib/rand";

export namespace ShelfSchema{
    export interface Shelf{
        _id: string;
        shelf_name : string;
        shelf_desc: string;
        ctime: string;
        utime: string;
    }

    export interface CreateShelfParams {
        shelf_name : string;
        shelf_desc: string;
    }

    export interface UpdateShelfParams {
        shelf_name? : string;
        shelf_desc? : string;
        utime?:string;
    }

    export const Generate = {
        NewShelfId : () => rand.alphabet(14)
    }

}