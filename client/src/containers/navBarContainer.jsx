import { connect } from 'react-redux';
import NavBar from '../components/navBar.jsx';

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const NavBarContainer = connect(
  mapStateToProps
)(NavBar);

export default NavBarContainer;