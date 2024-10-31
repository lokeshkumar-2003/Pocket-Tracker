import { useContext, useEffect } from "react";
import { UserVerfication } from "../service/AuthService";
import { useNavigate } from "react-router-dom";
import { RightToasterError, RightToasterSuccess } from "../toaster/Toasters.js";
import { UserContext } from "../context/UserContext.jsx";
import Navbar from "../components/Navbar/Navbar.jsx";
import HomeContainer from "./HomeContainer.jsx";
import { LoadingContext } from "../context/LoadingContext.jsx";
import Loader from "../components/Loader/Loader.jsx";
import { MessageContext } from "../context/MessageContext.jsx";

const HomePage = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const { isLoading } = useContext(LoadingContext);
  const { message, setMessage, success } = useContext(MessageContext);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      RightToasterError("Token not found, please log in.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
      return;
    }

    const userVerification = async () => {
      try {
        const response = await UserVerfication(token);
        if (response.success) {
          setUser(response.message);
        } else {
          RightToasterError(response.message || "Verification failed.");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (error) {
        console.error("Verification error:", error);
        RightToasterError("Verification failed, please try again.");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    };

    userVerification();
  }, [navigate, setUser]);

  useEffect(() => {
    if (success) {
      RightToasterSuccess(message);
      console.log(message, success);
      setMessage("");
    } else {
      console.log(message, success);
      RightToasterError(message);
      setMessage("");
    }
  }, []);

  return (
    <div>
      <Navbar />
      {isLoading ? <Loader /> : <HomeContainer />}
    </div>
  );
};

export default HomePage;
