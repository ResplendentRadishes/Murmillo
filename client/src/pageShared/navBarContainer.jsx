import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import NavBar from './navBar.jsx';
import { userLogout, setUser, setUserStat } from '../actions/actions.js';
import Axios from 'axios';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: function() {
      hashHistory.push('/');
      dispatch(userLogout());
      Axios.get('/user/logout');
    },
    setUser: function(user) {
      dispatch(setUser(user));
    },
    setUserStat: function(userStat) {
      dispatch(setUserStat(userStat));
    }
  }
}

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default NavBarContainer;