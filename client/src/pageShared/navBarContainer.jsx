import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { userLogout } from '../actions/actions.js';
import NavBar from './navBar.jsx';

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
    }
  }
}

const NavBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default NavBarContainer;