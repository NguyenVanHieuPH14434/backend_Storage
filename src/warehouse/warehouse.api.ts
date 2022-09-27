import { from } from 'form-data';
import { WarehouseController } from './warehouse.controller';
import * as express from 'express';
import { WarehouseSchema } from './warehouse';
import { Common } from '../common/common';
import csvtojson from 'csvtojson';
import { count } from 'console';

import dayjs from 'dayjs';

export function NewWarehouseAPI (warehouseController: WarehouseController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const perPage = 10;
        const pages = req.query.page || 1;
        const docs = await warehouseController.ListWarehouse(perPage, +pages);
        res.json(docs);
    });

 

    router.post('/create', async(req, res)=>{
        const parmas : WarehouseSchema.CreateWarehouseParams = {
            producer_name: req.body.producer_name,
            product_name: req.body.product_name,
            lot_number: req.body.lot_number
        };

        const doc = await warehouseController.CreateWarehouse(parmas);
        res.json(doc);
    });

    router.post('/update/:_id', async(req, res)=>{
        const params : WarehouseSchema.UpdateWarehouseParams = {
            producer_name: req.body.producer_name,
            product_name: req.body.product_name,
            lot_number: req.body.lot_number
        };
        const doc = await warehouseController.UpdateWarehouse(req.params._id, params);
        res.json(doc);
    });

    router.get('/edit/:_id', async(req, res)=>{
        const doc = await warehouseController.GetWarehouse(req.params._id);
        res.json(doc);
    });

    router.delete('/delete/:_id', async(req, res)=>{
        const doc = await warehouseController.DeleteWarehouse(req.params._id);
        res.json({status: 200, message: "Delete success!", data: doc});
    });

    router.get('/search', async(req, res)=>{
        let filter = {$regex:req.query.filter + '.*', $options: 'i'};
        const perPage = 10;
        const pages = req.query.page || 1;
        const docs = await warehouseController.searchWarehouse(filter, perPage, +pages);
        res.json(docs);
    });

    router.get('/export', async(req, res)=>{
        const setHeaderColumns = [
            {header:"ID", key:"_id"},
            {header:"Tên nhà cung cấp", key:"producer_name"},
            {header:"Tên hàng hóa", key:"product_name"},
            {header:"Số lô", key:"lot_number"},
        ];
        let data = Array();
        let reqToDate = '';
        if(!req.query.toDate && req.query.fromDate){
            reqToDate = String(req.query.fromDate);
        }else if(req.query.toDate && req.query.fromDate){
            reqToDate = String(req.query.toDate);
        }
        const toDate = Common.newToDate(reqToDate);
       
        if(!req.query.fromDate && !req.query.toDate){
             data = await warehouseController.GetAllWarehouse();
        }else if(req.query.fromDate && req.query.toDate){
                data = await warehouseController.exportWarehouse(req.query.fromDate, toDate);
        }else if(!req.query.toDate && req.query.fromDate){
            data = await warehouseController.exportWarehouse(req.query.fromDate, toDate);
        }   
   return  Common.exportData(data, setHeaderColumns, res, 'Consignment');
        
    })

    router.post('/import', Common.upload.single('File'), async(req, res)=>{
        // const data = await csvtojson().fromFile('./src/public/' + req.file?.originalname);
        const data = await Common.readingData(req.file?.originalname);
        await warehouseController.CreateManyWarehouse(data).then(()=>{
            res.send('Import Success')
        }).catch((err)=>{
            console.log(err);
            res.send(err)
        })
        
    });
   

    return router;
}