import ListErrors from '../ListErrors';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import bpEditorStore from "../../stores/bpEditorStore";
import commonStore from "../../stores/commonStore";

const btnStyle = {
  "backgroundColor": "5f0f0f",
  "color": "FFFFFF"
};

/**
 * Form for adding / editing bp values
 */
@inject('bpEditorStore', 'commonStore', 'bpStore')
@withRouter
@observer
export default class BPEditor extends React.Component {

  constructor(props){
    super(props);

    this.datetimeFormat = this.props.commonStore.datetimeFormat;
  }

  /**
   * If we're editing a value, load it's id from the URL
   */
  componentWillMount() {
    this.props.bpEditorStore.setBpId(this.props.match.params._id);
  }

  /**
   * Load the BP value if editing
   */
  componentDidMount() {
    this.props.bpEditorStore.loadInitialData();
  }

  /**
   * Handle changes to the BP to edit
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    if (this.props.match.params._id !== prevProps.match.params._id) {
      this.props.bpEditorStore.setBpId(this.props.match.params._id);
      this.props.bpEditorStore.loadInitialData();
    }
  }

  changeDatetime = (e) => this.props.bpEditorStore.setDatetime(e.target.value);
  changeSys = (e) => this.props.bpEditorStore.setSys(e.target.value);
  changeDia = (e) => this.props.bpEditorStore.setDia(e.target.value);
  changePulse = (e) => this.props.bpEditorStore.setPulse(e.target.value);
  changeNotes = (e) => this.props.bpEditorStore.setNotes(e.target.value);

  submitForm = (e) => {
    e.preventDefault();
    const { bpEditorStore } = this.props;
    bpEditorStore
      .submit()
      .then(bp => {
        bpEditorStore.reset();
        this.props.history.replace('/')
      });
  };

  render(){
    const {
      inProgress,
      errors,
      datetime,
      sys,
      dia,
      pulse,
      notes,
    } = this.props.bpEditorStore;

    return(
      <div id="BPEditor">
        <div className="row">

          <div className="col-md-6 offset-md-3 col-xs-12">
            <ListErrors errors={errors} />

            <form>
              <div className="form-group">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={this.datetimeFormat}
                    value={datetime}
                    onChange={this.changeDatetime}
                    disabled={inProgress}
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Sys"
                    value={sys}
                    onChange={this.changeSys}
                    disabled={inProgress}
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Dia"
                    value={dia}
                    onChange={this.changeDia}
                    disabled={inProgress}
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Pulse"
                    value={pulse}
                    onChange={this.changePulse}
                    disabled={inProgress}
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={this.changeNotes}
                    disabled={inProgress}
                    className="form-control form-control-sm"
                  />
                </div>

                <div className="form-group text-center">
                  <button
                    type="button"
                    disabled={inProgress}
                    onClick={this.submitForm}
                    className="btn btn-sm"
                    style={btnStyle}
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}