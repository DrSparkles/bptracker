import React from "react";
import { inject, observer } from 'mobx-react';
import BPTable from '../BPTable';
import ChartBPOverTime from "../ChartBPOverTime/ChartBPOverTime";

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

  handleEditRow = id => {
    this.props.history.replace('/editor/' + id );
  };

  render(){

    const { bpList, isLoading } = this.props.bpStore;
    if (this.props.userStore.currentUser){
      return (
        <div id='Home'>
          <ChartBPOverTime/>
          <BPTable
            bpList={bpList}
            isLoading={isLoading}
            onDelete={this.handleDeleteRow}
            onEdit={this.handleEditRow}
          />
        </div>
      );
    }
    else {
      return (<div id='Home'></div>);
    }
  }
}