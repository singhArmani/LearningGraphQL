import React, { PureComponent } from 'react';
class LinkList extends PureComponent {

  render() {
    const { links = [] } = this.props;
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

export default LinkList;