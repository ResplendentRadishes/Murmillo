import { connect } from 'react-redux';
import Axios from 'axios';
import Profile from './profile.jsx'

// ===============================================
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: function(id) {
      // console.log(id);
      Axios.get('/user/profile/' + id)
      .then (res => {
        console.log(res.data);
      })
    }
  }
}

const ProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

// ===============================================
export default ProfileContainer;