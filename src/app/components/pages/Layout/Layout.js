import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { inject, observer } from 'mobx-react';

// import mainStyles from '../../../public/styles/styles.css';
import layoutStyles from './styles.css';

import Home from '../Home';

// import Nav from '../../Nav/Nav';<Nav />
// import Footer from '../../Footer/Footer';<Footer />


//@inject('commonStore', 'bpStore')
@withRouter
@observer
export default class Layout extends React.Component {
  render(){
    return (
      <div id='Layout' className={layoutStyles.pageContainer}>

        <Switch>
          <Route path="/bp/:_id" component={Home} />
          <Route path="/" component={Home} />
        </Switch>

      </div>
    );
  }
}