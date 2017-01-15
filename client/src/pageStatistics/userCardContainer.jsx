import { connect } from 'react-redux';
import UserCard from './userCard.jsx'

// ===============================================
const mapStateToProps = (state, ownProps) => {
  return {
    user: ownProps.user || state.user
  }
}

const UserCardContainer = connect(
  mapStateToProps
)(UserCard);

// ===============================================
export default UserCardContainer;