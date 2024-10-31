import { useContext, useState } from "react";
import styles from "./TransactionForm.module.css";
import { LoadingContext } from "../../context/LoadingContext";
import { TransactionService } from "../../service/TransactionService";
import { UserContext } from "../../context/UserContext";
import { MessageContext } from "../../context/MessageContext";

const TransactionForm = ({ addTransaction, onClose }) => {
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("Expense");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const { setIsLoading } = useContext(LoadingContext);
  const { setMessage, setSuccess } = useContext(MessageContext);
  const { user } = useContext(UserContext);
  const { userId } = user;

  const expenseCategories = [
    "Food and Groceries",
    "Rent and Housing",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Education",
    "Expense Others",
  ];

  const incomeCategories = [
    "Salary",
    "Investments",
    "Business Income",
    "Income Others",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !category || !transactionType) {
      // Handle validation without toasters
      alert("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await TransactionService(
        userId,
        transactionType,
        category,
        amount,
        description
      );
      const { message, success } = response;
      setMessage(message);
      setSuccess(success);
    } catch (error) {
      alert("Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span onClick={() => onClose()} className={styles.close}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>Add Transaction</h2>

        <div className={styles.transactionForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Transaction Type:</label>
            <div className={styles.radioGroup}>
              <p>
                <input
                  type="radio"
                  value="Expense"
                  checked={transactionType === "Expense"}
                  onChange={() => setTransactionType("Expense")}
                />
                Expense
              </p>
              <p>
                <input
                  type="radio"
                  value="Income"
                  checked={transactionType === "Income"}
                  onChange={() => setTransactionType("Income")}
                />
                Income
              </p>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">-- Select a Category --</option>
              {transactionType === "Expense"
                ? expenseCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))
                : incomeCategories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Amount:</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description (Optional):</label>
            <textarea
              style={{ height: "50px" }}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button onClick={(e) => handleSubmit(e)} className={styles.submitBtn}>
            Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionForm;
