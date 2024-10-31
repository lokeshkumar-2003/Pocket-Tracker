import axiosInstance from "../axiosConfig/Axios.js";

const SummeryService = async (userId) => {
  try {
    const res = await axiosInstance.get(`analytics/summery/${userId}`, {
      withCredentials: true,
    });
    console.log(res);
    const { summary } = res.data;

    return { summary };
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    const success = err.response?.data?.success || false;
    return { message, success };
  }
};

const TransactionTableService = async (userId, sortBy) => {
  console.log(userId, sortBy);
  try {
    const res = await axiosInstance.post(
      `transactions/filter/${userId}`,
      {
        sortBy,
      },
      {
        withCredentials: true,
      }
    );

    const { transactionList } = res.data;
    return { transactionList };
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    const success = err.response?.data?.success || false;
    return { message, success };
  }
};

const PieChartService = async (userId, option) => {
  try {
    const res = await axiosInstance.post(
      `analytics/piechart/${userId}`,
      option,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    const success = err.response?.data?.success || false;
    return { message, success };
  }
};

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
console.log(currentYear);

let currentYearMonth = `${currentYear}-0${currentMonth}`;

const AreaChartService = async (
  userId,
  yearMonth = { yearMonth: currentYearMonth }
) => {
  try {
    const res = await axiosInstance.post(
      `analytics/timelinechart/${userId}`,
      { yearMonth: yearMonth?.yearMonth },
      {
        withCredentials: true,
      }
    );

    const { areaChartValue } = res.data;
    return { areaChartValue };
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    const success = err.response?.data?.success || false;
    return { message, success };
  }
};

const GaugeChartService = async (userId) => {
  try {
    const res = await axiosInstance.get(`analytics/guage/${userId}`, {
      withCredentials: true,
    });

    const { overAllSpent, remainAmount } = res.data;
    return { overAllSpent, remainAmount };
  } catch (err) {
    const message = err.response?.data?.message || "Something went wrong";
    const success = err.response?.data?.success || false;
    return { message, success };
  }
};

export {
  SummeryService,
  TransactionTableService,
  PieChartService,
  AreaChartService,
  GaugeChartService,
};
