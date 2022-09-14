import { WarehouseController } from './warehouse.controller';
import * as express from 'express';
import { WarehouseSchema } from './warehouse';

export function NewWarehouseAPI (warehouseController: WarehouseController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const docs = await warehouseController.ListWarehouse();
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

    router.delete('/delete/:_id', async(req, res)=>{
        const doc = await warehouseController.DeleteWarehouse(req.params._id);
        res.json({status: 200, message: "Delete success!", data: doc});
    });

    return router;
}