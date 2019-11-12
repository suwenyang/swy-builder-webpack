/**
 * Created by swy on 2019/11/6.
 */
/*import React from "react";
import ReactDom from "react-dom";

import imgSrc from "./images/parent3-3@.jpg";

import largeNumber from "../../../large-number/dist/large-number.js";
import './search.less';*/

const React = require("react");
const imgSrc = require("./images/parent3-3@.jpg");
const largeNumber = require("../../../large-number/dist/large-number.js");
require("./search.less");

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
    const addResult = largeNumber('999', '1');
    return <div className="search">
      {addResult}
      {
        Text ? <Text /> : null
      }
      reart text2221
      <img src={imgSrc} onClick={this.loadComponent.bind(this)} />
    </div>;
  }
}

module.exports = <Search />;
