import { Doughnut } from "react-chartjs-2";
import styles from "./DoughnetChart.module.css"; // Ensure you have a CSS module for styling
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { PieChartService } from "../../service/MatricsService";
import { UserContext } from "../../context/UserContext";
import { SlOptionsVertical } from "react-icons/sl";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
  const { user } = useContext(UserContext);
  const { userId } = user;
  const [pieSet, setPieSet] = useState({});
  const [option, setOption] = useState({
    income: false,
    expense: false,
    both: true,
  });

  const backGroundColor = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#7D36FF",
  ];

  const [isMenuVisible, setIsMenuVisible] = useState(false);

  useEffect(() => {
    const fetchPieValue = async () => {
      if (userId) {
        const result = await PieChartService(userId, option);
        if (result && result.pieValue) {
          const pieLable = Object.keys(result.pieValue);
          const value = Object.values(result.pieValue);
          setPieSet({
            pieLable,
            value,
          });
        }
      }
    };
    fetchPieValue();
  }, [userId, option]); // Added `option` as a dependency

  const data = {
    labels: pieSet?.pieLable || [],
    datasets: [
      {
        label: "Financial Distribution",
        data: pieSet?.value || [],
        backgroundColor: backGroundColor.slice(0, pieSet?.pieLable?.length),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff", // Set legend text color to white
          padding: 20, // Adjust distance between legend and chart
          font: {
            size: 13, // Adjust font size for legend
            family: "Afacad Flux, sans-serif",
          },
        },
      },
      title: {
        display: true,
        text: "Financial Distribution",
        color: "#ffffff", // Set title text color to white
        font: {
          size: 20, // Adjust font size for title
          family: "Afacad Flux, sans-serif",
        },
      },
    },
  };

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleOptionClick = (selectedOption) => {
    if (selectedOption === "Income") {
      setOption({ income: true, expense: false, both: false }); // Updated to set `both` false
    } else if (selectedOption === "Expense") {
      setOption({ income: false, expense: true, both: false });
    } else if (selectedOption === "Both") {
      setOption({ income: false, expense: false, both: true });
    }
    setIsMenuVisible(false);
  };

  return (
    <div className={styles.chartCard}>
      <Doughnut
        data={data}
        options={chartOptions}
        style={{ width: "230px", height: "230px" }}
      />

      <SlOptionsVertical className={styles.optionButton} onClick={toggleMenu} />
      {isMenuVisible && (
        <ul className={styles.menuBar}>
          <li
            className={option.income ? styles.menuOption : ""}
            style={{ cursor: "pointer" }}
            onClick={() => handleOptionClick("Income")}
          >
            Income
          </li>
          <li
            className={option.expense ? styles.menuOption : ""}
            style={{ cursor: "pointer" }}
            onClick={() => handleOptionClick("Expense")}
          >
            Expense
          </li>
          <li
            className={option.both ? styles.menuOption : ""}
            style={{ cursor: "pointer" }}
            onClick={() => handleOptionClick("Both")}
          >
            Both
          </li>
        </ul>
      )}
    </div>
  );
};

export default DoughnutChart;
