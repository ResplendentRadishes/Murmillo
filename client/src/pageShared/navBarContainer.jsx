import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import NavBar from './navBar.jsx';
import { userLogout, setUser } from '../actions/actions.js';
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
      Axios.get('/logout');
    },
    setUser: function(user) {
      dispatch(setUser(user));
    }
  }
}

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default NavBarContainer;