import React, { Component } from 'react'

import LinkList from './components/LinkList';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const LINK_QUERY = gql`
  query GetLinks {
    store {
      links {
        _id,
        title,
        url
      }
    }
  }
`;
const App = () => (
  <Query query={LINK_QUERY} notifyOnNetworkStatusChange >
    {({loading, error, data, refetch, networkStatus }) => {
      if (networkStatus === 4) return "Refetching!";
      if(loading) return <h2>Loading links...</h2>;
      return (<><LinkList links={data.store.links} />
        <button onClick={() => refetch()}>Refetch</button>
      </>)
    }}
  </Query>
);

export default App;