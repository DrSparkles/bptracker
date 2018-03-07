import React from "react";
import { inject, observer } from 'mobx-react';

@observer
export default class Home extends React.Component {
  render(){
    return (
      <div id='Home'>
        <h1>I'm Home</h1>
      </div>
    );
  }
}