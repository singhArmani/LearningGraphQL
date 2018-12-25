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
    name: 'Counter',
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
    return new GraphQLSchema({
        query: new GraphQLObjectType({
            name: 'Query',
            fields: () => ({
                links: {
                    type: new GraphQLList(linkType),
                    resolve: () => db.collection('links').find({}).toArray()
                }
            }) 
        })
    });
}

export const resolvers = () => {};

export const typeDefs = '';