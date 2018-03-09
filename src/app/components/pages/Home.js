import React from "react";
import { inject, observer } from 'mobx-react';
import BPTable from '../BPTable';

/**
 * Home page; show the bp values of the current logged in user
 */
@inject('bpStore', 'userStore')
@observer
export default class Home extends React.Component {

  componentWillMount() {
    if (this.props.userStore.currentUser){
      this.props.bpStore.loadAllBPsForUser();
    }
  }

  componentDidMount() {
    if (this.props.userStore.currentUser){
      this.props.bpStore.loadAllBPsForUser();
    }
  }

  handleDeleteRow = id => {
    this.props.bpStore.deleteBP(id)
      .then(() => this.props.history.replace('/'));
  };

  render(){

    const { bpList, isLoading } = this.props.bpStore;
    if (this.props.userStore.currentUser){
      return (
        <div id='Home'>
          <BPTable
            bpList={bpList}
            isLoading={isLoading}
            onDelete={this.handleDeleteRow}
          />
        </div>
      );
    }
    else {
      return (<div id='Home'></div>);
    }
  }
}