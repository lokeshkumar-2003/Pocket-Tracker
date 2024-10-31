import { useContext, useEffect, useState } from "react";
import styles from "./ProfileForm.module.css";
import { LoadingContext } from "../../context/LoadingContext";
import { UserContext } from "../../context/UserContext";
import { MessageContext } from "../../context/MessageContext";
import {
  addProfileService,
  updateProfileService,
  getProfileService,
} from "../../service/ProfileService";

const ProfileForm = ({ onClose }) => {
  const [profileData, setProfileData] = useState({
    phone: "",
    gender: "",
    monthlyIncome: 0,
    budgetGoal: 0,
    address: "",
    dob: "",
  });

  const [checkProfile, setCheckProfile] = useState(false);
  const { setIsLoading } = useContext(LoadingContext);
  const { setMessage, setSuccess } = useContext(MessageContext);
  const { user } = useContext(UserContext);
  const { userId } = user;

  useEffect(() => {
    const checkIfProfileExist = async () => {
      const { profile } = await getProfileService(userId);
      if (profile) {
        setProfileData(profile); // Set profile data if exists
        setCheckProfile(true);
      }
    };
    checkIfProfileExist();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    console.log(profileData);

    try {
      const response = checkProfile
        ? await updateProfileService(userId, {
            phone: profileData.phone,
            monthlyIncome: profileData.monthlyIncome,
            budgetGoal: profileData.budgetGoal,
            dob: profileData.dob,
            address: profileData.address,
            gender: profileData.gender,
          })
        : await addProfileService(userId, {
            gender: profileData.gender,
            phone: profileData.phone,
            monthlyIncome: profileData.monthlyIncome,
            budgetGoal: profileData.budgetGoal,
            dob: profileData.dob,
            address: profileData.address,
          });

      const { message, success } = response;

      setMessage(message);
      setSuccess(success);
      onClose(); // Close the modal after success
    } catch (error) {
      alert("Profile update failed");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span onClick={onClose} className={styles.close}>
          &times;
        </span>
        <h2 className={styles.modalTitle}>
          {checkProfile ? "Update Profile" : "Add Profile"}
        </h2>
        <form className={styles.transactionForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={profileData.gender}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Monthly Income:</label>
            <input
              type="number"
              name="monthlyIncome"
              value={profileData.monthlyIncome}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Budget Goal:</label>
            <input
              type="number"
              name="budgetGoal"
              value={profileData.budgetGoal}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>DOB:</label>
            <input
              type="date"
              name="dob"
              value={profileData.dob ? profileData.dob.slice(0, 10) : ""}
              onChange={handleChange}
              required
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "24px",
              justifyContent: "center",
            }}
            className={styles.btnContainer}
          >
            <button
              type="submit"
              style={{ backgroundColor: "#eab308" }}
              className={styles.submitBtn}
            >
              {checkProfile ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.submitBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
