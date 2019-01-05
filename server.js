import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import GraphQLHTTP from 'express-graphql';
import { Schema } from './data/schema';
import mgdb from './db';

const app = express();

app.use(express.static('public'));
app.use(cors())

let db; 
(async () => {
    try {
        const client = await MongoClient.connect(mgdb.MONGO_URL, mgdb.options);
         db = client.db('singhmongo');
        const schema = Schema(db);
        app.use('/graphql', GraphQLHTTP({
            schema,
            graphiql: true
        }));
        app.listen(5000, () => console.log('listening on port 5000'));

    }catch (err) {
        // handle error
        console.log(err)
    }
})()
