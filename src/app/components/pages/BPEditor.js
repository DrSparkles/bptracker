import ListErrors from '../ListErrors';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import bpEditorStore from "../../stores/bpEditorStore";
import moment from "moment/moment";
import commonStore from "../../stores/commonStore";

@inject('bpEditorStore', 'commonStore', 'bpStore')
@withRouter
@observer
export default class BPEditor extends React.Component {

  constructor(props){
    super(props);

    this.datetimeFormat = this.props.commonStore.datetimeFormat;
  }

  componentWillMount() {
    this.props.bpEditorStore.setBpId(this.props.match.params._id);
  }

  componentDidMount() {
    this.props.bpEditorStore.loadInitialData();
  }

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

    //const datetimeString = this.props.bpStore.getDatetimeAsFormattedString(datetime);

    return(
      <div id="BPEditor">
        <ListErrors errors={errors} />

        <form>
          <fieldset>
            <fieldset>
              <input
                type="text"
                placeholder={this.datetimeFormat}
                value={datetime}
                onChange={this.changeDatetime}
                disabled={inProgress}
              />
            </fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Sys"
                value={sys}
                onChange={this.changeSys}
                disabled={inProgress}
              />
            </fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Dia"
                value={dia}
                onChange={this.changeDia}
                disabled={inProgress}
              />
            </fieldset>

            <fieldset>
              <input
                type="text"
                placeholder="Pulse"
                value={pulse}
                onChange={this.changePulse}
                disabled={inProgress}
              />
            </fieldset>

            <fieldset>
              <textarea
                placeholder="Notes"
                value={notes}
                onChange={this.changeNotes}
                disabled={inProgress}
              />
            </fieldset>

            <button
              type="button"
              disabled={inProgress}
              onClick={this.submitForm}
            >
              Save
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}