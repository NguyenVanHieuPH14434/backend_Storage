import { ShelfController } from './shelf.controller';
import * as express from 'express';
import { ShelfSchema } from './shelf';
import csvtojson from 'csvtojson';
import EXCEL from 'exceljs';
import { Common} from '../common/common';
import XLSX from 'xlsx';


export function NewShelfAPI(shelfController: ShelfController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const perPages = 1000;
        const pages = req.query.page || 1;  
        const docs = await shelfController.ListShelf(perPages, +pages);
        res.json(docs);
    });

    router.post('/create', async(req, res)=>{
        const params : ShelfSchema.CreateShelfParams={
            shelf_name: req.body.shelf_name,
            shelf_desc: req.body.shelf_desc
        };

        const doc = await shelfController.CreateShelf(params);
        res.json(doc);
    });

    router.post('/update/:_id', async(req, res)=>{
        const params : ShelfSchema.UpdateShelfParams={
            shelf_name: req.body.shelf_name,
            shelf_desc: req.body.shelf_desc
        };
        const doc = await shelfController.UpdateShelf(req.params._id, params);
        res.json(doc);
    });

    router.get('/edit/:_id', async(req, res)=>{
        const doc = await shelfController.GetShelf(req.params._id);
        res.json(doc);
    });

    router.delete('/delete/:_id', async(req, res)=>{
        const doc = await shelfController.DeleteShelf(req.params._id);
        res.json({status:200, message: "Delete success", data:doc});
    });

    
    router.get('/search', async(req, res)=>{
        let filter = {$regex: req.query.filter + '.*', $options:'i'};
        const perPages = 10;
        const pages = req.query.page || 1;  
        const docs = await shelfController.searchShelf(filter, perPages, +pages);
        res.json(docs);
    });

       
    router.post('/import', Common.upload.single('File'),  async(req, res)=>{
    //    const data = await csvtojson().fromFile('./src/public/' + req.file?.originalname)
    const data = await Common.readingData(req.file?.originalname);
       await shelfController.CreateManyShelf(data).then(()=>{
           res.send('Import Success');
       }).catch((err)=>{
        res.send(err)
       });
    });


    router.get('/export', async(req, res)=>{
        const setHeaderColumns = [
            {header:"ID", key:"_id"},
                {header:"Tên kệ", key:"shelf_name"},
                {header:"Ghi chú", key:"shelf_desc"},
                {header:"Ngày tạo", key:"ctime"},
        ];

        let data = Array();
        let reqToDate = '';

        if(req.query.fromDate && !req.query.toDate){
            reqToDate = String(req.query.fromDate);
        }else if(req.query.fromDate && req.query.toDate){
            reqToDate = String(req.query.toDate);
        }

        const toDate = Common.newToDate(reqToDate);

        if(!req.query.fromDate && !req.query.toDate){
         data = await shelfController.GetAllShelf();
        }else if(req.query.fromDate && req.query.toDate){
            data = await shelfController.exportShelf(req.query.fromDate, toDate);
        }else if(req.query.fromDate && !req.query.toDate){
            data = await shelfController.exportShelf(req.query.fromDate, toDate);
        }
        Common.exportData(data, setHeaderColumns, res, 'Shelf');
        
    }); 

    return router;
}