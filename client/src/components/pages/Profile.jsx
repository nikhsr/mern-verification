import React from 'react';
import { connect } from 'react-redux';

const notFound = ({ user }) => {
  return (
    <div className='container'>
      <p>
        Hey <i>{user.username}</i>
      </p>
      <h1>You have successfully logged in !!!</h1>
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.user,
  };
}

export default connect(mapStateToProps)(notFound);
