import { useContext, useState, useEffect } from "react";
import Styles from "./TransTable.module.css";
import { UserContext } from "../../context/UserContext";
import { TransactionTableService } from "../../service/MatricsService";
import { SlOptionsVertical } from "react-icons/sl";

const TransTable = () => {
  const [data, setData] = useState([]);
  const [options, setOptions] = useState({
    latest: true,
    oldest: false,
  });
  const { user } = useContext(UserContext);
  const { userId } = user;
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId) {
        const { transactionList } = await TransactionTableService(
          userId,
          "latest"
        );
        setData(transactionList);
      }
    };
    fetchData();
  }, [userId]);

  const fetchTransactionData = async (option) => {
    let sortBy = option === "Latest" ? "latest" : "oldest";
    if (userId) {
      const { transactionList } = await TransactionTableService(userId, sortBy);
      setData(transactionList);
    }
  };

  const handleSelectOption = (sortBy) => {
    if (sortBy === "Latest") {
      setOptions({ latest: true, oldest: false });
      fetchTransactionData("latest");
    } else {
      setOptions({ latest: false, oldest: true });
      fetchTransactionData("oldest");
    }
    setIsMenuVisible(false);
  };

  return (
    <div className={Styles.tableContainer}>
      <table className={Styles.transactionTable}>
        <thead>
          <tr>
            <th>No</th>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Transaction</th>
            <th>Amount</th> {/* Added header for Money */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) &&
            data.map((item, i) => (
              <tr key={item?._id}>
                <td>{i + 1}</td>
                <td>{new Date(item?.date).toLocaleDateString()}</td>
                <td>{item?.description}</td>
                <td>{item?.category}</td>
                <td>{item?.transactionType}</td>
                <td>₹ {item?.amount?.toFixed(2) || "N/A"}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <SlOptionsVertical className={Styles.optionButton} onClick={toggleMenu} />

      {isMenuVisible && (
        <ul className={Styles.menuBar}>
          <li
            className={options.latest && Styles.selected}
            onClick={() => handleSelectOption("Latest")}
          >
            Latest
          </li>
          <li
            className={options.oldest && Styles.selected}
            onClick={() => handleSelectOption("Oldest")}
          >
            Oldest
          </li>
        </ul>
      )}
    </div>
  );
};

export default TransTable;
