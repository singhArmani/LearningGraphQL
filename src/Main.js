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
    const { links } = this.state;
    return (
      <>
        <h3>Links</h3>
        <ul>
          {links.map(el => <li key={el._id}><a href={el.url}>{el.title}</a></li>)}
        </ul>
      </>
    )
  }
}
