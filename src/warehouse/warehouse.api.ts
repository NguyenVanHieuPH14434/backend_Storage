import { WarehouseController } from './warehouse.controller';
import * as express from 'express';
import { WarehouseSchema } from './warehouse';

export function NewWarehouseAPI (warehouseController: WarehouseController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        let filter = {};
        const perPage = 10;
        const pages = req.query.page || 1;
        if(req.query.product_name){
            const product_name = req.query.product_name;
            filter = {product_name};
        }
        if(req.query.producer_name){
            const producer_name = req.query.producer_name;
            filter = {producer_name};
        }
        if(req.query.lot_number){
            const lot_number = req.query.lot_number;
            filter = {lot_number};
        }
        if(req.query._id){
            const _id = req.query._id;
            filter = {_id};
        }
       
    
        const docs = await warehouseController.ListWarehouse(filter, perPage, +pages);
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

    return router;
}