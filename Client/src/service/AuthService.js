import axiosInstance from "../axiosConfig/Axios.js";

const SignupService = async (username, email, password) => {
  try {
    const res = await axiosInstance.post(
      "auth/signup",
      {
        username,
        password,
        email,
      },
      { withCredentials: true }
    );
    // Correctly access the response data
    const { message, success, jwt } = res.data;
    return { message, success, jwt };
  } catch (err) {
    // Handle the error and correctly access the error response
    const { message, success } = err.response.data;
    return { message, success };
  }
};

const LoginService = async (email, password) => {
  try {
    const res = await axiosInstance.post(
      "auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    // Correctly access the response data
    const { message, success, jwt } = res.data;
    return { message, success, jwt };
  } catch (err) {
    // Handle the error and correctly access the error response
    const { message, success } = err.response.data;
    return { message, success };
  }
};

const UserVerfication = async (token) => {
  try {
    const res = await axiosInstance.post("/auth/usersession", { token });
    const { success, message } = res.data;
    return { success, message };
  } catch (err) {
    const { message, success } = err.response.data;
    return { message, success };
  }
};

export { LoginService, SignupService, UserVerfication };
