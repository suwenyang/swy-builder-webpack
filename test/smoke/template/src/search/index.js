import React from "react";
import ReactDom from "react-dom";

import imgSrc from "./images/parent3-3@.jpg";

import './search.less';

class Search extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      Text: null
    };
  }
  loadComponent() {
    import('./text.js').then((Text) => {
      this.setState({
        Text: Text.default
      });
    });
  }
  render() {
    const {Text} = this.state;
    return <div className="search">
      {
        Text ? <Text /> : null
      }
      reart text2221
      <img src={imgSrc} onClick={this.loadComponent.bind(this)} />
    </div>;
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)
