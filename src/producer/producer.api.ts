import { ProducerController } from './producer.controller';
import * as express from 'express';
import { ProducerSchema } from './producer';

export function NewProducerAPI(producerController: ProducerController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        let filter = {};
        const perPage = 10;
        const pages = req.query.page || 1;
        if(req.query.producer_name){
            const producer_name = req.query.producer_name;
            filter = {producer_name};
        }
        if(req.query._id){
            const _id = req.query._id;
            filter = {_id};
        }
   
        const docs = await producerController.ListProducer(filter, perPage, +pages);
        res.json(docs);
    });

    router.post('/create', async (req, res)=>{
        const params : ProducerSchema.CreateProducerParams = {
            producer_name: req.body.producer_name,
            producer_address: req.body.producer_address,
            producer_email: req.body.producer_email,
            producer_phone: req.body.producer_phone
        };
        const doc = await producerController.CreateProducer(params);
        res.json(doc);
    });

    router.post('/update/:_id', async(req, res)=>{
        const params:ProducerSchema.UpdateProducerParams = {
            producer_name: req.body.producer_name,
            producer_address: req.body.producer_address,
            producer_email: req.body.producer_email,
            producer_phone: req.body.producer_phone,
        };
        const doc = await producerController.UpdateProducer(req.params._id, params);
        res.json(doc);
    });

    router.get('/edit/:_id', async(req, res)=>{
        const doc = await producerController.GetProducer(req.params._id);
        res.json(doc);
    });


    router.delete('/delete/:_id', async(req, res)=>{
        const doc = await producerController.DeleteProducer(req.params._id);
        res.json({status: 200, message: 'Delete success!', data: doc});
    });

    return router;
}