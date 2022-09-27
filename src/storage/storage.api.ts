import { StorageController } from './storage.controller';
import * as express from 'express';
import { StorageSchema } from './storage';
import csvtojson from 'csvtojson';
import { Common } from '../common/common';

export function NewStorageAPI (storageController : StorageController) {
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const docs = await storageController.ListStorage();
        res.json(docs);
    });

    router.post('/create', async(req, res)=>{
        const params : StorageSchema.CreateStorageParams = {
            lot_number: req.body.lot_number,
            product_name: req.body.product_name,
            shelf_number: req.body.shelf_number,
            type: req.body.type,
            quantity: +req.body.quantity,
            nsx: req.body.nsx,
            hsd: req.body.hsd
        };

        const doc = await storageController.CreateStorage(params);
        res.json(doc);
    });

    router.post('/update/:_id', async(req, res)=> {
        const params : StorageSchema.UpdateStorageParams = {
            lot_number: req.body.lot_number,
            product_name: req.body.product_name,
            shelf_number: req.body.shelf_number,
            type: req.body.type,
            quantity: +req.body.quantity,
            nsx: req.body.nsx,
            hsd: req.body.hsd
        };

        const doc = await storageController.UpdateStorage(req.params._id, params);

        res.json(doc);
    });

    router.get('/edit/:_id', async(req, res)=>{
        const doc = await storageController.GetStorage(req.params._id);
        res.json(doc);
    });

    router.delete('/delete/:_id', async(req, res) =>{
        const doc = await storageController.DeleteStorage(req.params._id);
        res.json({status: 200, message: 'Delete success', data: doc});
    });

    router.get('/search', async(req, res)=>{
        let filter = {$regex: req.query.filter + '.*', $options:'i'};
        const docs = await storageController.searchStorage(filter);
        res.json(docs);
    });

    router.get('/export', async(req, res)=>{
        const setHeaderColumns = [
            {header:"ID", key:"_id"},
            {header:"Tên hàng hóa", key:"product_name"},
            {header:"Số lô", key:"lot_number"},
            {header:"Số kệ ", key:"shelf_number"},
            {header:"Loại", key:"type"},
            {header:"Số lượng", key:"quantity"},
            {header:"NSX", key:"nsx"},
            {header:"HSD", key:"hsd"},
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
            data = await storageController.GetAllStorage();
       }else if(req.query.fromDate && req.query.toDate){
               data = await storageController.exportStorage(req.query.fromDate, toDate);
       }else if(!req.query.toDate && req.query.fromDate){
           data = await storageController.exportStorage(req.query.fromDate, toDate);
       }   

        Common.exportData(data, setHeaderColumns, res, 'Storage');
    });

    return router;
}