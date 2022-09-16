import { ShelfSchema } from "./shelf";
import { ShelfModel } from "./shelf.model";
import dayjs from "dayjs";

export class ShelfController {
    constructor(private model : ShelfModel){}

    async init() {}

    async ListShelf (filter:any, perPage:number, page:number) {
        return this.model.ListShelf(filter, perPage, page);
    }

    async GetShelf(_id:string){
        const doc = await this.model.GetShelf(_id);
        return doc; 
    }

    async CreateShelf (params: ShelfSchema.CreateShelfParams){
        const now = dayjs();
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');
        const shelf : ShelfSchema.Shelf = {
            _id: ShelfSchema.Generate.NewShelfId(),
            shelf_name: params.shelf_name,
            shelf_desc: params.shelf_desc,
            ctime: nowFormat,
            utime: nowFormat
        };

        await this.model.CreateShelf(shelf);
        return shelf;
    }

    async UpdateShelf (_id:string, parmas: ShelfSchema.UpdateShelfParams){
        const now = dayjs();
         
        const nowFormat = now.format('DD/MM/YYYY HH:mm:ss');
        const shelf = {...parmas};
        shelf.utime = nowFormat;
        await this.model.UpdateShelf(_id, shelf);
        return shelf;
    }

    async DeleteShelf(_id:string){
        const doc = await this.GetShelf(_id);
        await this.model.DeleteShelf(_id);
        return doc;
    }
}