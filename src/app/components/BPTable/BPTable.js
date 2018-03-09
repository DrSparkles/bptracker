import React from "react";
import { observer } from 'mobx-react';
import styles from './styles.css';
import BPRow from './BPRow';
import LoadingSpinner from '../LoadingSpinner';

/**
 * Display table for a user's BP Values
 */
@observer
export default class BPTable extends React.Component {

  render(){
    const {bpList} = this.props;
    const bpRows  = bpList.map((bpItem) => {
      return (
        <BPRow
          key={bpItem._id}
          bpData={bpItem}
          onDelete={this.props.onDelete}
          onSelectToEdit={this.props.onSelectToEdit}
        />
      );
    });

    if (this.props.isLoading === false){
      return (
        <div id='BPTable'>
          <table className={styles.bpTable}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Sys</th>
                <th>DIA</th>
                <th>Pulse</th>
                <th>Notes</th>
                <th>Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {bpRows}
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (
        <LoadingSpinner/>
      );
    }
  }
}