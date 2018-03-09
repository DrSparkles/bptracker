import React from "react";

const btnStyle = {
  "backgroundColor": "5f0f0f",
  "color": "FFFFFF",
  "margin": "0"
};

/**
 * A row of the bp table
 */
export default class BPRow extends React.Component {

  onDelete = () => this.props.onDelete(this.props.bpData._id);
  onEdit = () => this.props.onEdit(this.props.bpData._id);

  render(){

    return (
      <tr>
        <td>{this.props.bpData.datetime}</td>
        <td>{this.props.bpData.sys}</td>
        <td>{this.props.bpData.dia}</td>
        <td>{this.props.bpData.pulse}</td>
        <td>{this.props.bpData.notes}</td>
        <td>

          <button onClick={this.onEdit} style={btnStyle} className="btn btn-sm">
            Edit
          </button>
          &nbsp;/&nbsp;

          <button onClick={this.onDelete} style={btnStyle} className="btn btn-sm">
            Delete
          </button>

        </td>
      </tr>
    );
  }
}