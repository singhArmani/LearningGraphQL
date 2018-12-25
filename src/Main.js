import React, { Component } from 'react'

import LinkStore from './stores/linkStore';

import linkApi from './services/api/linkAPI';


let _getAppState = () => {
  return { links: LinkStore.getAll() };
}
export default class Main extends Component {

  constructor(props) {
    super(props);

    this.state = _getAppState();
  }

  componentDidMount() {
    linkApi.getLinks();
    LinkStore.on('change', this.onChange)
  }

  componentWillUnmount(){
    LinkStore.removeListener('change', this.onChange);
  }

  onChange = () => {
    this.setState(_getAppState);
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
          {this.state.links.map(el => <li key={el._id}><a href={el.url}>{el.title}</a></li>)}
        </ul>
      </>
    )
  }
}
