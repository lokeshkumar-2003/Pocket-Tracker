import styles from "./StepupProgress.module.css";

const StepupProgress = ({ currentStep }) => {
  return (
    <div>
      <div className={styles.stepperWrapper}>
        <div
          className={`${styles.stepperItem} ${
            currentStep >= 1 ? styles.active : ""
          }`}
        >
          <div className={styles.stepCounter}>1</div>
          <div className={styles.stepName}>Enter Email</div>
        </div>
        <div
          className={`${styles.stepperItem} ${
            currentStep >= 2 ? styles.active : ""
          }`}
        >
          <div className={styles.stepCounter}>2</div>
          <div className={styles.stepName}>Verify OTP</div>
        </div>
        <div
          className={`${styles.stepperItem} ${
            currentStep >= 3 ? styles.active : ""
          }`}
        >
          <div className={styles.stepCounter}>3</div>
          <div className={styles.stepName}>Change Password</div>
        </div>
      </div>
    </div>
  );
};

export default StepupProgress;
