import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Toolbar from '@material-ui/core/Toolbar';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const NavBar = ({ user, isAuth }) => {
  return (
    <div className={useStyles().root}>
      <Toolbar>
        <NavLink className='inactive ' activeClassName='active' to='/home'>
          <Button color='primary'>Home</Button>
        </NavLink>
        {!isAuth && (
          <div>
            <NavLink className='inactive' activeClassName='active' to='/login'>
              <Button color='primary'>login</Button>
            </NavLink>
            <NavLink
              className='inactive '
              activeClassName='active'
              to='/register'
            >
              <Button color='primary'>Register</Button>
            </NavLink>
          </div>
        )}
        {isAuth && (
          <div>
            <NavLink
              className='inactive'
              activeClassName=' active'
              to='/my-profile'
            >
              <Button color='primary'>{user.username}</Button>
            </NavLink>
            <NavLink
              className='item'
              activeClassName='item active'
              to='/logout'
            >
              <Button color='primary'>Logout</Button>
            </NavLink>
          </div>
        )}
      </Toolbar>
    </div>
  );
};

function mapStateToProps({ user }) {
  return {
    user: user.user,
    isAuth: user.isAuth,
  };
}

export default withRouter(connect(mapStateToProps)(NavBar));
