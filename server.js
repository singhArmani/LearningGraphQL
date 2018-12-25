import express from 'express';
import { MongoClient } from 'mongodb';
import GraphQLHTTP from 'express-graphql';

import { Schema } from './data/schema';
import mgdb from './db';

const app = express();

app.use(express.static('public'));

let db;


MongoClient.connect(mgdb.MONGO_URL, mgdb.options,  (err, client) => {
    if(err) throw err;

    db = client.db('singhmongo');
    app.use('/graphql', GraphQLHTTP({
        schema: Schema(db),
        graphiql: true
    }));
    app.listen(3000, () => console.log('listening on port 3000'));
});

// app.get('/data/links', (req, res) => {
//     db.collection("links").find({}).toArray((err, links) => {
//         if(err) throw err;
        
//         res.json(links);
//     })
// })