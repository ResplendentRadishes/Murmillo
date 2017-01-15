import React from 'react';

const UserCard = (props) => {
  let user = props.user;
  return (
    <div className="container">
      <div className="col-lg-3 col-sm-6">
        <div className="card hovercard">
          <div className="cardheader">

          </div>
          <div className="avatar">
            <img alt="" src={user.avatarUrl} />
          </div>
          <div className="info">
            <div className="title">
              <p>{user.username}</p>
            </div>
            <div className="desc"><a href={"mailto:" + user.email}>{user.email}</a></div>
            <div className="desc">{"Score: " + user.score}</div>
            <div className="desc">{"Games played: " + user.games}</div>
            <div className="bottom">
              <a className="btn btn-round btn-primary btn-github btn-sm" href={user.githubUrl}>
                <i className="fa fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserCard;