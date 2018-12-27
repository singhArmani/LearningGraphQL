import fs from 'fs';
import express from 'express';
import { MongoClient } from 'mongodb';
import GraphQLHTTP from 'express-graphql';
import { graphql} from 'graphql';
import { introspectionQuery} from 'graphql/utilities'
import { Schema } from './data/schema';
import mgdb from './db';
import { fromString } from 'long';

const app = express();

app.use(express.static('public'));

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
        app.listen(3000, () => console.log('listening on port 3000'));

        // Generate schema.json
        const jsonSchema = await graphql(schema, introspectionQuery);

        fs.writeFile('./data/schema.json', JSON.stringify(jsonSchema, null, 2), err => {
            if(err) {
                throw err;
            }
            console.log('Json schema created successfully!')
        })
    }catch (err) {
        // handle error
    }
})()
