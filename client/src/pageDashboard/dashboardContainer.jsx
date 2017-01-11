import { connect } from 'react-redux';
import Dashboard from './dashboard.jsx';

const mapStateToProps = (state) => {
  return {
    currentRoom: state.room
  }
}

const DashboardContainer = connect(
  mapStateToProps
)(Dashboard);

export default DashboardContainer;