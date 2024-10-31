import axiosInstance from "../axiosConfig/Axios.js";

const EmailCredientalService = async (toEmail) => {
  const response = await axiosInstance
    .post("/auth/user-verify", { toEmail })
    .then((res) => {
      const { success, message } = res.data;
      console.log(success, message);
      return { success, message };
    })
    .catch((err) => {
      const { success, message } = err.response.data;
      return { success, message };
    });
  return response;
};

const OtpVerificationService = async (otp) => {
  const response = await axiosInstance
    .post("/auth/otp-verify", { otp })
    .then((res) => {
      const { success, message } = res.data;
      return { success, message };
    })
    .catch((err) => {
      const { success, message } = err.response.data;
      return { success, message };
    });

  return response;
};

const ResetPasswordService = async (email, password, confirmPassword) => {
  const response = await axiosInstance
    .post("/auth/resetPassword", { email, password, confirmPassword })
    .then((res) => {
      const { success, message } = res.data;
      return { success, message };
    })
    .catch((err) => {
      if (err && err.response && err.response.data) {
        const { success, message } = err.response.data;
        return { success, message };
      }
    });

  return response;
};

export { EmailCredientalService, OtpVerificationService, ResetPasswordService };
