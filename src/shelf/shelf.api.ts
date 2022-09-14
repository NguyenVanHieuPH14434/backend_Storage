import { ShelfController } from './shelf.controller';
import * as express from 'express';
import { ShelfSchema } from './shelf';

export function NewShelfAPI(shelfController: ShelfController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const docs = await shelfController.ListShelf();
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

    router.delete('/delete/:_id', async(req, res)=>{
        const doc = await shelfController.DeleteShelf(req.params._id);
        res.json({status:200, message: "Delete success", data:doc});
    });


    return router;
}