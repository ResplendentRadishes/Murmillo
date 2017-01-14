import { connect } from 'react-redux';
import UserCard from './userCard.jsx'

// ===============================================
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const UserCardContainer = connect(
  mapStateToProps
)(UserCard);

// ===============================================
export default UserCardContainer;