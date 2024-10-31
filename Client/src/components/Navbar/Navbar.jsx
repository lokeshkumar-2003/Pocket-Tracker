import { useContext, useState, useEffect } from "react";
import Style from "./Navbar.module.css";
import { IoDocument } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import Modal from "../Model/Model.jsx";
import { FaPowerOff } from "react-icons/fa";
import { UserContext } from "../../context/UserContext.jsx";
import { ModelContext } from "../../context/ModelRenderContext.jsx";

const Navbar = () => {
  const { user, handleLogout } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { type, setType } = useContext(ModelContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsModalOpen(false); // Close the modal on Escape key press
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <nav className={Style.navContainer}>
        <div>
          <h3>Pocket Picker</h3>
        </div>
        <ul className={Style.listing}>
          <li
            onClick={() => {
              toggleModal();
              console.log(type);
              setType("docGenerator");
            }}
          >
            <IoDocument />
          </li>

          <li
            onClick={() => {
              toggleModal();
              console.log(type);
              setType("profileForm");
            }}
          >
            <FaCircleUser />
            <span>{user.name}</span>
          </li>
          <li>
            <FaPowerOff color="orangeRed" onClick={() => handleLogout()} />
          </li>
        </ul>
      </nav>
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
    </>
  );
};

export default Navbar;
