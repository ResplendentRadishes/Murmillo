import React from 'react';

const Profile = (props) => {
  props.initialize(props.user.githubId);
  return (
    <div className="container-fluid">
      <img src={props.user.avatarUrl} style={{height: 100, width: 100}} />
    </div>
  );
}
export default Profile;