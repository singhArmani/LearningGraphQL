import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} from 'graphql';

// ref: https://github.com/apollographql/apollo-server/issues/1633
const ObjectId = require('mongodb').ObjectId;
ObjectId.prototype.valueOf = function () {
	return this.toString();
};


const linkType = new GraphQLObjectType({
    name: 'link',
    fields: () => ({
        _id: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString
        },
        url: {
            type: GraphQLString
        }
    })
})

export const Schema = db => {
    let store = {};
    const storeType = new GraphQLObjectType({
        name: 'Store',
        fields: () => ({
            links: {
            type: new GraphQLList(linkType),
            resolve: () => db.collection('links').find({}).toArray()
            }
        })
    });

    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                store: {
                    type: storeType,
                    resolve: () => store
                }
            }) 
        })
    });
}

export const resolvers = () => {};

export const typeDefs = '';