import React, { Component } from 'react'

import * as LinkActions from './actions';

import linkApi from './services/api/linkAPI';

export default class Main extends Component {

  state = {
    links: null,
    isFetchingLinks: true,
    errorFetchingLinks: false
  }
  async componentDidMount() {
    try{
      const response = await linkApi.getLinks();
      // const links = await response.json();
      LinkActions.updateLinks(response.data);
      this.setState({
        links: response.data,
        isFetchingLinks: false
      })
    } catch(err) {
      console.log(err)
    }
  }
  render() {
    const { links, isFetchingLinks } = this.state;
    if(isFetchingLinks) {
      return <h3>Fetching Links ...</h3>
    }
    return (
      <>
        <h3>Links</h3>
        <ul>
          {this.state.links.map(el => <li key={el._id}>{el.title} - {el.url}</li>)}
        </ul>
      </>
    )
  }
}
