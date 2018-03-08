import React from "react";
import { inject, observer } from 'mobx-react';
import BPTable from '../BPTable';

@inject('bpStore', 'userStore')
@observer
export default class Home extends React.Component {

  componentWillMount() {

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
}