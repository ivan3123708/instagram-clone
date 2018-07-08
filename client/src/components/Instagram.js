import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../actions/userActions';
import LandingPage from './LandingPage';
import Homepage from './Homepage';

class Instagram extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="instagram">
        {this.props.loggedUser ? <Homepage /> : <LandingPage />}
      </div>
    );
  }
}

Instagram.propTypes = {
  loggedUser: PropTypes.shape.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loggedUser: state.loggedUser,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Instagram);
