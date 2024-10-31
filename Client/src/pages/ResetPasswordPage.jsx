import { useContext, useState, useEffect } from "react";
import styles from "./ResetPasswordStyle.module.css";
import StepupProgress from "../components/StepProgress/StepupProgress";
import { MdEmail } from "react-icons/md";
import { ImKey } from "react-icons/im";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import {
  EmailCredientalService,
  OtpVerificationService,
  ResetPasswordService,
} from "../service/ResetPasswordService";
import { LoadingContext } from "../context/LoadingContext";
import Loader from "../components/Loader/Loader";
import { RightToasterError, RightToasterSuccess } from "../toaster/Toasters";

const EmailPage = () => {
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [signInEmail, setSignInEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toasterMessage, setToasterMessage] = useState(null);
  const [toasterType, setToasterType] = useState(null);

  useEffect(() => {
    if (!isLoading && toasterMessage) {
      if (toasterType === "success") {
        RightToasterSuccess(toasterMessage);
      } else if (toasterType === "error") {
        RightToasterError(toasterMessage);
      }

      // Reset toaster after showing
      setToasterMessage(null);
      setToasterType(null);
    }
  }, [isLoading, toasterMessage, toasterType]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await EmailCredientalService(signInEmail);
      console.log("Email Service Response:", response); // Log response to check structure
      const { success, message } = response || {}; // Ensure response is defined
      if (success) {
        setToasterMessage(message);
        setToasterType("success");
        setCurrentStep(2);
      } else {
        setToasterMessage(message || "Failed to send OTP.");
        setToasterType("error");
      }
    } catch (error) {
      setToasterMessage("Failed to send OTP.");
      setToasterType("error");
      console.error("Email Submission Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      let otpNum = otp * 1;

      const response = await OtpVerificationService(otpNum);
      console.log("OTP Service Response:", response); // Log response to check structure
      const { success, message } = response || {}; // Ensure response is defined
      if (success) {
        setToasterMessage(message);
        setToasterType("success");
        setCurrentStep(3);
      } else {
        setToasterMessage(message || "Failed to verify OTP.");
        setToasterType("error");
      }
    } catch (error) {
      setToasterMessage("Failed to verify OTP.");
      setToasterType("error");
      console.error("OTP Submission Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await ResetPasswordService(
        signInEmail,
        confirmPassword,
        newPassword
      );
      console.log("Password Reset Service Response:", response); // Log response to check structure
      const { success, message } = response || {}; // Ensure response is defined
      if (success) {
        setToasterMessage("Password changed successfully!");
        setToasterType("success");
        setCurrentStep(1); // Optionally redirect back to login
      } else {
        setToasterMessage(message || "Failed to reset password.");
        setToasterType("error");
      }
    } catch (error) {
      setToasterMessage("Failed to reset password.");
      setToasterType("error");
      console.error("Password Change Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.formNestedContainer}>
          <StepupProgress currentStep={currentStep} />

          <form
            className={styles.formContainer}
            onSubmit={
              currentStep === 1
                ? handleEmailSubmit
                : currentStep === 2
                ? handleOtpSubmit
                : handlePasswordChange
            }
          >
            {currentStep === 1 && (
              <>
                <h3 className={styles.formHeading}>Enter your email</h3>
                <div className={styles.inputField}>
                  <div className={styles.centerIcon}>
                    <MdEmail fontSize={15} color="black" />
                  </div>
                  <input
                    type="email"
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className={styles.emailInput}
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Send OTP
                </button>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h3 className={styles.formHeading}>Verify OTP</h3>
                <div className={styles.inputField}>
                  <div className={styles.centerIcon}>
                    <ImKey fontSize={16} color="black" />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    maxLength={6} // Add validation for OTP length
                    required
                    className={styles.emailInput}
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Verify OTP
                </button>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h3 className={styles.formHeading}>Change Password</h3>
                <div className={styles.inputField}>
                  <div className={styles.centerIcon}>
                    <MdEmail fontSize={15} color="black" />
                  </div>
                  <input
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className={styles.emailInput}
                  />
                </div>
                <div className={styles.inputField}>
                  <div className={styles.centerIcon}>
                    <RiLockPasswordLine fontSize={15} color="black" />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New Password"
                    required
                    className={styles.emailInput}
                  />
                </div>
                <div className={styles.inputField}>
                  <div className={styles.centerIcon}>
                    <RiLockPasswordFill fontSize={15} color="black" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className={styles.emailInput}
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Change Password
                </button>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default EmailPage;
