const React = require('react');
const ReactDOM = require('react-dom');

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const httpLink = createHttpLink({
    uri: "http://localhost:3000/graphql"
})
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});


import App from './app'

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('react'));
