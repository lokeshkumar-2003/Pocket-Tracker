import { useContext, useState } from "react";
import styles from "./TransactionForm.module.css";
import { LoadingContext } from "../../context/LoadingContext";
import { ReportGenService } from "../../service/ReportService";
import { UserContext } from "../../context/UserContext";
import { MessageContext } from "../../context/MessageContext";

const DocumentGenerator = ({ onClose }) => {
  const [year, setYear] = useState(new Date().getFullYear()); // Default to current year
  const [month, setMonth] = useState("01"); // Default to January
  const [localSuccess, setLocalSuccess] = useState(false); // Local success state for display
  const { setIsLoading } = useContext(LoadingContext);
  const { setMessage, setSuccess } = useContext(MessageContext);
  const { user } = useContext(UserContext);
  const { userId } = user;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let yearMonth = `${year}-${month}`;

    try {
      const response = await ReportGenService(userId, yearMonth);
      const { message, success } = response;
      setMessage(message || "Report generated successfully");
      setSuccess(success || true);
      setLocalSuccess(success || true); // Set local success state for display
    } catch (error) {
      alert("Failed to generate report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 8 }, (_, i) => currentYear - i);
  };

  const monthOptions = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span onClick={() => onClose()} className={styles.close}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>Transaction Receipt</h2>

        <form className={styles.transactionForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Year:</label>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {getYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Month:</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {monthOptions.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          {localSuccess && (
            <p style={{ color: "green", marginTop: "10px" }}>
              Transaction in downloads
            </p>
          )}

          <button type="submit" className={styles.submitBtn}>
            Generate 📄
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentGenerator;
