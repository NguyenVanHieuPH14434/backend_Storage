import { ProducerController } from './producer.controller';
import * as express from 'express';
import { ProducerSchema } from './producer';
import { Common } from '../common/common';
import csvtojson from 'csvtojson';

export function NewProducerAPI(producerController: ProducerController){
    const router = express.Router();

    router.get('/list', async(req, res)=>{
        const perPage = 1000;
        const pages = req.query.page || 1;
        const docs = await producerController.ListProducer(perPage, +pages);
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

    router.get('/search', async(req, res)=>{
        let filter = {$regex:req.query.filter + '.*', $options:'i'};
        const perPage = 10;
        const pages = req.query.page || 1;
        const docs = await producerController.searchProducer(filter, perPage, +pages);
        res.json(docs);
    });

    router.post('/import',Common.upload.single('File'), async(req, res)=>{
        // const data = await csvtojson().fromFile('./src/public/'+ req.file?.originalname);
        const data = await Common.readingData(req.file?.originalname);
        await producerController.CreateManyProducer(data).then(()=>{
            res.send('Import Success');
        }).catch((err)=>{
            console.log(err);
            res.send(err)
            
        })
    });

    router.get('/export', async(req, res)=>{
        const  setHeaderColumns =[
            {header:"ID", key:"_id"},
            {header:"Tên nhà cung cấp", key:"producer_name"},
            {header:"Địa chỉ", key:"producer_address"},
            {header:"Email", key:"producer_email"},
            {header:"SĐT", key:"producer_phone"},
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
             data = await producerController.GetAllProducer();
        }else if(req.query.fromDate && req.query.toDate){
                data = await producerController.exportProducer(req.query.fromDate, toDate);
        }else if(!req.query.toDate && req.query.fromDate){
            data = await producerController.exportProducer(req.query.fromDate, toDate);
        }   

        Common.exportData(data, setHeaderColumns, res, 'Producer');
    });

    return router;
}