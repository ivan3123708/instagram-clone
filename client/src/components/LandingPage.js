import React from 'react';
import Facebook from 'react-icons/lib/fa/facebook-official';

const LandingPage = () => (
  <div className="landing-page">
    <div className="container">
      <div className="left">
        <img src="img/preview.png" alt="preview" />
      </div>
      <div className="right">
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
          <form>
            <input placeholder="Mobile Number or Email" />
            <input placeholder="Full Name" />
            <input placeholder="Username" />
            <input placeholder="Password" />
            <button className="btn-big-blue">Sign up</button>
          </form>
          <p>
            By signing up, you agree to our <b>Terms, Data Policy</b> and <b>Cookies Policy</b>.
          </p>
        </div>
        <div className="action-login">
          <p>Have an account? <a href="#">Log in</a></p>
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
            <li><a href="#">SUPPOR</a></li>
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

export default LandingPage;
