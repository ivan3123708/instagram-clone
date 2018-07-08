import axios from 'axios';

const getUser = () => (dispatch) => {
  axios.get('/api/user')
    .then((response) => dispatch({
      type: 'GET_USER',
      user: response.data,
    }))
    .catch((err) => console.log(err));
};

export { getUser };
