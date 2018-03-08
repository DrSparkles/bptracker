import React from "react";
import { Link } from "react-router-dom";

export default class BPRow extends React.Component {

  constructor(props){
    super(props);
  }

  onDelete = () => this.props.onDelete(this.props.bpData._id);

  onSelectToEdit = () => this.props.onSelectToEdit(this.props.bpData._id);

  render(){
    const _id = this.props.bpData._id;
    return (
      <tr>
        <td>{this.props.bpData.datetime}</td>
        <td>{this.props.bpData.sys}</td>
        <td>{this.props.bpData.dia}</td>
        <td>{this.props.bpData.pulse}</td>
        <td>{this.props.bpData.notes}</td>
        <td>
          <Link to={"/editor/" + _id} onClick={this.onSelectToEdit.bind(this)}>Edit</Link>
          &nbsp;/&nbsp;

          <button onClick={this.onDelete}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}