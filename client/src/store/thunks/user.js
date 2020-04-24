import { getUser } from '../../api/index';
import { updateUser } from '../actions/user';

export const attemptGetUser = () => (dispatch) =>
  getUser().then((res) => {
    dispatch(updateUser(res.data.user));
    return res.data.user;
  });
