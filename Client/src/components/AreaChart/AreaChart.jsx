import { Line } from "react-chartjs-2";
import styles from "./AreaChart.module.css";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
  CategoryScale,
} from "chart.js";
import { useContext, useEffect, useState } from "react";
import { AreaChartService } from "../../service/MatricsService";
import { UserContext } from "../../context/UserContext";
import { FaSearch } from "react-icons/fa";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
  CategoryScale
);

const monthNumber = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

const AreaChart = ({ chartData }) => {
  const { user } = useContext(UserContext);
  const { userId } = user;
  const [amount, setAmount] = useState({ income: [], expense: [], dates: [] });
  const [monthYear, setMonthYear] = useState("");

  const fetchAreaChartValue = async (yearMonth) => {
    console.log(yearMonth);
    if (userId) {
      const { areaChartValue } = await AreaChartService(userId, {
        yearMonth,
      });
      const income = [];
      const expense = [];
      const dates = [];
      areaChartValue.forEach((value) => {
        income.push(value?.income || 0);
        expense.push(value?.expense || 0);
        if (value?.date) dates.push(value.date);
      });

      setAmount({ income, expense, dates });

      console.log(amount);
    }
  };

  useEffect(() => {
    const defaultYearMonth = `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}`;
    fetchAreaChartValue(defaultYearMonth);
  }, [userId]);

  const data = chartData || {
    labels: amount.dates,
    datasets: [
      {
        label: "Expense",
        data: amount.expense,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 2,
        fill: true,
      },
      {
        label: "Income",
        data: amount.income,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
          padding: 20,
          font: {
            size: 14,
            family: "'Afacad Flux', sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Sales Distribution (2024)",
        color: "#ffffff",
        font: {
          size: 18,
          family: "'Afacad Flux', sans-serif",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "#ffffff",
        },
      },
    },
  };

  const getLastTwelveMonthsAndLastTenYears = () => {
    const months = [];
    const years = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Get the last 12 months
    for (let i = 0; i < 12; i++) {
      const month = new Date(currentYear, currentDate.getMonth() - i);
      const monthName = month.toLocaleString("default", { month: "long" });
      months.push(monthName);
    }

    // Get the last 10 years
    for (let i = 0; i < 10; i++) {
      years.push(currentYear - i);
    }

    return { months: months.reverse(), years: years.reverse() }; // Return both arrays
  };

  const { months, years } = getLastTwelveMonthsAndLastTenYears();

  // Initialize with current month and year
  const initialMonth = new Date().toLocaleString("default", { month: "long" });
  const initialYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleSearch = () => {
    const monthNum = monthNumber[selectedMonth];
    const yearMonth = `${selectedYear}-${String(monthNum).padStart(2, "0")}`;
    fetchAreaChartValue(yearMonth); // Call the function with the selected year and month
  };

  return (
    <div
      className={styles.chartContainer}
      style={{ width: "100%", height: "400px" }}
    >
      <Line data={data} options={options} />
      <div className={styles.optionButton}>
        <select onChange={handleMonthChange} value={selectedMonth}>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select onChange={handleYearChange} value={selectedYear}>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default AreaChart;
