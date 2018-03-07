import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import MainNav from '../MainNav';

@inject('userStore', 'commonStore')
@observer
class Header extends React.Component {
  render() {
    return (
      <div id='Header'>
        <nav className="navbar navbar-light">

          <Link to="/">
            {this.props.commonStore.appName.toLowerCase()}
          </Link>

          <MainNav />
        </nav>
      </div>
    );
  }
}

export default Header;
