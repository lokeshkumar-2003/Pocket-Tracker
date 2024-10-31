import axiosInstance from "../axiosConfig/Axios";

const TransactionService = async (
  userId,
  transactionType,
  category,
  amount,
  description
) => {
  try {
    const res = await axiosInstance.post(
      `transaction/${userId}`,
      {
        transactionType,
        category,
        amount,
        description,
      },
      {
        withCredentials: true, // Ensures credentials (cookies, etc.) are included in the request
      }
    );

    const { message, success } = res.data;

    return { message, success };
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    const success = err.response?.data?.success || false;
    return { message, success };
  }
};

export { TransactionService };
