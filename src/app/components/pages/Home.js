import React from "react";
import { inject, observer } from 'mobx-react';
import BPTable from '../BPTable';

@inject('bpStore')
@observer
export default class Home extends React.Component {

  componentWillMount() {

  }

  componentDidMount() {
    this.props.bpStore.loadAllBPsForUser();
  }

  handleDeleteRow = () => {};
  handleEditRow = () => {};

  render(){

    //const { currentUser } = this.props.userStore;
    const { bpList, isLoading } = this.props.bpStore;

    return (
      <div id='Home'>
        <BPTable
          bpList={bpList}
          isLoading={isLoading}
          onDelete={this.handleDeleteRow}
          onSelectToEdit={this.handleEditRow}
        />
      </div>
    );
  }
}