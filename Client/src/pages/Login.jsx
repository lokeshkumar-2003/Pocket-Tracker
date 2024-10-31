import "./LoginStyle.css";
import { useContext, useState } from "react";
import log from "../assets/LoginAssets/log.svg";
import register from "../assets/LoginAssets/register.svg";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { LoginService, SignupService } from "../service/AuthService";

import {
  RightToasterSuccess,
  LeftToasterSuccess,
  RightToasterError,
  LeftToasterError,
} from "../toaster/Toasters";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { LoadingContext } from "../context/LoadingContext";
import Loader from "../components/Loader/Loader";

const SignInSignUp = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  // State for Sign Up
  const [signUpMode, setSignUpMode] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  // State for Sign In
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignUpClick = () => {
    setSignUpMode(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await LoginService(signInEmail, signInPassword).finally(
        () => {
          setIsLoading(false);
        }
      );
      const { message, success, jwt } = response;

      localStorage.setItem("Token", jwt);

      if (success) {
        RightToasterSuccess(message);
      } else {
        RightToasterError(message);
      }

      setTimeout(() => {
        navigate("/home");
      }, 600);
    } catch (error) {
      console.log(error.message);
      RightToasterError(error.message); // Optionally show error toast
    }

    // Clear Sign In fields
    setSignInEmail("");
    setSignInPassword("");
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await SignupService(
        signUpUsername,
        signUpEmail,
        signUpPassword
      ).finally(() => {
        setIsLoading(false);
      });
      const { message, success, jwt } = response;
      localStorage.setItem("Token", jwt);
      if (success) {
        LeftToasterSuccess(message);
      } else {
        LeftToasterError(message);
      }

      setTimeout(() => {
        navigate("/home");
      }, 600);
    } catch (error) {
      console.log(error.message);
      LeftToasterError("Sign up failed");
    }

    setSignUpUsername("");
    setSignUpEmail("");
    setSignUpPassword("");
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form onSubmit={handleSignInSubmit} className="sign-in-form">
            <h2 className="title">Sign In</h2>
            <div className="input-field">
              <div className="center-icon">
                <MdEmail />
              </div>
              <input
                type="email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-field">
              <div className="center-icon">
                <RiLockPasswordFill />
              </div>
              <input
                type="password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />

            <p className="text-center">
              <Link to="/reset-password">Reset password in here</Link>
            </p>
          </form>

          {/* Sign Up Form */}
          <form onSubmit={handleSignUpSubmit} className="sign-up-form">
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <div className="center-icon">
                <FaUser />
              </div>
              <input
                type="text"
                value={signUpUsername}
                onChange={(e) => setSignUpUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="input-field">
              <div className="center-icon">
                <MdEmail />
              </div>
              <input
                type="email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-field">
              <div className="center-icon">
                <RiLockPasswordFill />
              </div>
              <input
                type="password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <input type="submit" value="Sign Up" className="btn solid" />
          </form>
        </div>
      </div>

      {/* Panels */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Welcome back to Expense Tracker! 🫡</h3>
            <p>
              We're glad to have you back! Continue where you left off and keep
              your finances on track.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
          </div>
          <img src={log} className="image" alt="log" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>Welcome to Expense Tracker! 💸</h3>
            <p>
              Take control of your finances today. Start tracking your expenses
              and saving for a better future!
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
          </div>
          <img src={register} className="image" alt="register" />
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default SignInSignUp;
