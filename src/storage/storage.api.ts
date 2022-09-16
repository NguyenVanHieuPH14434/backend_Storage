import { StorageController } from './storage.controller';
import * as express from 'express';
import { StorageSchema } from './storage';

export function NewStorageAPI (storageController : StorageController) {
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        let filter = {};
       
        if(req.query.product_name){
            const product_name = req.query.product_name;
            filter = {product_name};
        }
       
        const docs = await storageController.ListStorage(filter);
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

    return router;
}