import { ShelfController } from './shelf/shelf.controller';
import { ShelfModel } from './shelf/shelf.model';
import { StorageController } from './storage/storage.controller';
import { StorageModel } from './storage/storage.model';
import { WarehouseController } from './warehouse/warehouse.controller';
import { WarehouseModel } from './warehouse/warehouse.model';
import { ProducerController } from './producer/producer.controller';
import { ProducerModel } from './producer/producer.model';
import { MongoCommon } from './lib/mongodb';
import express from 'express';
import cors from 'cors';
import { ReadConfig } from './config';
import { NewProducerAPI } from './producer/producer.api';
import { NewWarehouseAPI } from './warehouse/warehouse.api';
import { NewStorageAPI } from './storage/storage.api';
import { NewShelfAPI } from './shelf/shelf.api';

export async function main() {

const config = await ReadConfig();
console.log(config);
const client = await MongoCommon.Connect(`${config.database.db_url}`, {replica:true});
console.log('Connected to database');

const database = client.db(config.database.db_name);

const producerModel = new ProducerModel(database);
await producerModel.init();
const producerController = new ProducerController(producerModel);
await producerController.init();

const warehouseModel = new WarehouseModel(database);
await warehouseModel.init();
const warehouseController = new WarehouseController(warehouseModel);
await warehouseController.init();

const storageModel = new StorageModel(database);
await storageModel.init();
const storageController = new StorageController(storageModel);
await storageController.init();

const shelfModel = new ShelfModel(database);
await shelfModel.init();
const shelfController = new ShelfController(shelfModel);
await shelfController.init();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.disable("x-powered-by")

app.get('/', (req, res)=>{
    res.send('â');
})

app.use('/api/producer', NewProducerAPI(producerController));
app.use('/api/consignment', NewWarehouseAPI(warehouseController));
app.use('/api/storage', NewStorageAPI(storageController));
app.use('/api/shelf', NewShelfAPI(shelfController));

app.listen(PORT, ()=>{
    console.log('Server running!');
})
}

main();