import { useContext, useEffect, useState } from "react";
import AreaChart from "../components/AreaChart/AreaChart";
import DoughnutChart from "../components/DoughnetChart/DoughnetChart";
import Styles from "./HomeContainer.module.css";
import SummeryChart from "../components/SummeryChart/SummeryChart";
import TransTable from "../components/TransactionTable/TransTable";
import Modal from "../components/Model/Model";
import GaugeChart from "../components/GaugeChart/GaugeChart";
import { ModelContext } from "../context/ModelRenderContext";
import { UserContext } from "../context/UserContext";
import { getProfileService } from "../service/ProfileService";
import { RightToasterError, RightToasterSuccess } from "../toaster/Toasters";

const HomeContainer = () => {
  const { user } = useContext(UserContext);
  const { userId } = user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { type, setType } = useContext(ModelContext);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const checkProfileData = async () => {
    try {
      const response = await getProfileService(userId);
      const { message, success } = response;
      return { message, success };
    } catch (err) {
      const { success, message } = err;
      return { success, message };
    }
  };

  useEffect(() => {
    const responseData = async () => {
      const response = await checkProfileData();
      console.log(response);
      if (response?.success) {
        RightToasterSuccess(response?.message);
        console.log(response);
      } else {
        RightToasterError(response?.message);
      }
    };
    responseData();
  }, [userId]);

  return (
    <>
      <div className={Styles.container}>
        <div className={Styles.containerWrapper}>
          {/* First row with three components */}
          <div className={Styles.firstContainer}>
            <SummeryChart />
            <DoughnutChart />
            <GaugeChart />
          </div>

          <TransTable />
          <div className={`${Styles.scrollHidden} ${Styles.secondContainer}`}>
            <AreaChart />
          </div>
        </div>
      </div>
      {/* Floating add button */}
      <button
        className={Styles.addButton}
        onClick={() => {
          handleOpenModal();
          setType("transactionForm");
        }}
      >
        +
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default HomeContainer;
