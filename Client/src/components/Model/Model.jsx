import { useContext, useEffect } from "react";
import Style from "./Model.module.css";
import TransactionsForm from "./TransactionsForm";
import DocumentGenerator from "./DocumentGenerator";
import ProfileForm from "./ProfileForm";
import { ModelContext } from "../../context/ModelRenderContext";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const { type } = useContext(ModelContext);
  console.log(type);
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={Style.modalOverlay}>
      <div className={Style.modalContent}>
        {type === "transactionForm" && <TransactionsForm onClose={onClose} />}
        {type === "profileForm" && <ProfileForm onClose={onClose} />}
        {type === "docGenerator" && <DocumentGenerator onClose={onClose} />}
      </div>
    </div>
  );
};

export default Modal;
