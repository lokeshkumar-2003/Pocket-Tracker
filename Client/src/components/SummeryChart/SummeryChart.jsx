import logo from "../../assets/Profile/face.png";
import Styles from "./SummeryChart.module.css";
import { SummeryService } from "../../service/MatricsService";
import { UserContext } from "../../context/UserContext";
import { useContext, useEffect, useState } from "react";

const SummeryChart = () => {
  const { user } = useContext(UserContext);
  const { userId, name } = user;
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummerReport = async () => {
      if (userId) {
        try {
          const response = await SummeryService(userId);
          console.log(response);
          setSummary(response.summary);
        } catch (error) {
          console.error("Error fetching summary data:", error);
        }
      }
    };
    fetchSummerReport();
  }, [userId]);

  return (
    <div className={Styles.container}>
      <div className={Styles.card}>
        <div className={Styles.imageContainer}>
          <img src={summary?.profile} alt="Profile" className={Styles.image} />
          <p className={Styles.userName}>{name}</p>
        </div>

        <hr className={Styles.separator} />
        <div className={Styles.statsContainer}>
          <ul className={Styles.statsList}>
            <li className={Styles.statItem}>
              <span className={Styles.label}>Total Income</span>
              <span className={Styles.value}>
                ₹ {summary?.totalIncome || 0}
              </span>
            </li>
            <li className={Styles.statItem}>
              <span className={Styles.label}>Total Expense</span>
              <span className={Styles.value}>
                ₹ {summary?.totalExpense || 0}
              </span>
            </li>
            <li className={Styles.statItem}>
              <span className={Styles.label}>Current Balance</span>
              <span className={Styles.value}>
                ₹ {summary?.currentBalance || 0}
              </span>
            </li>
            <li className={Styles.statItem}>
              <span className={Styles.label}>Budget Goal</span>
              <span className={Styles.value}>₹ {summary?.budgetGoal || 0}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SummeryChart;
