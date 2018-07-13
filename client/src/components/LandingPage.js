import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import Facebook from 'react-icons/lib/fa/facebook-official';
import { getUser } from '../actions/userActions';

class LandingPage extends React.Component {
  constructor() {
    super();

    this.state = {
      error: null,
      form: 'register',
    };

    this.toggleForm = this.toggleForm.bind(this);
    this.submitRegister = this.submitRegister.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  toggleForm() {
    this.setState((prevState) => ({
      form: prevState.form === 'register' ? 'login' : 'register',
      error: null,
    }));
  }

  submitRegister(e) {
    e.preventDefault();

    const emailOrPhone = e.target.emailOrPhone.value;
    const fullname = e.target.fullname.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    axios.post('/auth/register', {
      emailOrPhone,
      fullname,
      username,
      password,
    })
      .then((res) => {
        if (res.data === 'OK') {
          this.props.getUser();
        } else {
          this.setState({ error: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitLogin(e) {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    axios.post('/auth/login', {
      username,
      password,
    })
      .then((res) => {
        if (res.data === 'OK') {
          this.props.getUser();
        } else {
          this.setState({ error: res.data });
        }
      })
      .catch(() => {
        this.setState({ error: 'Sorry, your username or password was incorrect. Please double-check your username and password.' });
      });
  }

  render() {
    return (
      <div className="landing-page">
        <div className="container">
          <div className="left">
            <img src="img/preview.png" alt="preview" />
          </div>
          <div className="right">
            {this.state.form === 'register' ?
              <div className="form-div">
                <img src="img/instagram_logo.png" alt="instagram logo" />
                <p>Sign up to see photos and videos from your friends.</p>
                <button className="btn-big-blue">
                  <Facebook className="icon" size="18" />
                  Log in with Facebook
                </button>
                <div className="or">
                  <div className="line" /><b>OR</b><div className="line" />
                </div>
                <form onSubmit={this.submitRegister}>
                  <input type="text" name="emailOrPhone" placeholder="Mobile Number or Email" />
                  <input type="text" name="fullname" placeholder="Full Name" />
                  <input type="text" name="username" placeholder="Username" />
                  <input type="password" name="password" placeholder="Password" />
                  <button className="btn-big-blue">Sign up</button>
                  <p className="error">{this.state.error}</p>
                </form>
                <p>
                  By signing up, you agree to our <b>Terms, Data Policy</b> and <b>Cookies Policy</b>.
                </p>
              </div>
              :
              <div className="form-div">
                <img src="img/instagram_logo.png" alt="instagram logo" />
                <form onSubmit={this.submitLogin}>
                  <input type="text" name="username" placeholder="Phone Number, Username or Email" />
                  <input type="password" name="password" placeholder="Password" />
                  <button className="btn-big-blue">Log in</button>
                  <p className="error">{this.state.error}</p>
                  <a href="#">Forgot password?</a>
                </form>
              </div>
            }
            <div className="action-login">
              {this.state.form === 'register' ?
                <p>Have an account? <button className="btn-link" onClick={this.toggleForm}>Log in</button></p>
                :
                <p>Don&apos;t have an account? <button className="btn-link" onClick={this.toggleForm}>Sign up</button></p>
              }
            </div>
            <div className="get-app">
              <p>Get the app.</p>
              <div>
                <a href="#"><img src="img/app_store.png" alt="apple store" /></a>
                <a href="#"><img src="img/google_play.png" alt="google store" /></a>
              </div>
            </div>
          </div>
        </div>
        <footer>
          <div>
            <nav>
              <ul>
                <li><a href="#">ABOUT US</a></li>
                <li><a href="#">SUPPORT</a></li>
                <li><a href="#">BLOG</a></li>
                <li><a href="#">PRESS</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">JOBS</a></li>
                <li><a href="#">PRIVACY</a></li>
                <li><a href="#">TERMS</a></li>
                <li><a href="#">DIRECTORY</a></li>
                <li><a href="#">PROFILES</a></li>
                <li><a href="#">HASHTAGS</a></li>
                <li><a href="#">LANGUAGE</a></li>
              </ul>
            </nav>
            <span>&copy; 2018 INSTAGRAM</span>
          </div>
        </footer>
      </div>
    );
  }
}

LandingPage.propTypes = {
  getUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUser()),
});

export default connect(null, mapDispatchToProps)(LandingPage);
