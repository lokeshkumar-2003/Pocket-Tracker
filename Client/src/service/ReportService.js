import axiosInstance from "../axiosConfig/Axios.js";

const ReportGenService = async (userId, yearMonth) => {
  try {
    const res = await axiosInstance.post(
      `report/${userId}`,
      { yearMonth },
      { withCredentials: true }
    );
    // Correctly access the response data
    const { message, success } = res.data;
    return { message, success };
  } catch (err) {
    // Handle the error and correctly access the error response
    const { message, success } = err.response.data;
    return { message, success };
  }
};

export { ReportGenService };
