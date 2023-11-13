import React from "react";
import "./CustomModal.css";
import logoblack from "../../assets/OLX-Logo-black.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { googleSignIn } from "../../store/actions/authActions";

const CustomModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.googleLogin.user);

  const handleGoogleSignIn = async () => {
    try {
      await dispatch(googleSignIn());
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error occurred during Google sign-in:", error);
    }
  };
  return (
    <div className={`custom-modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="modal-logo">
          <img src={logoblack} width={85} />
        </div>
        <div className="modal-title">
          <h2>Welcome to OLX</h2>
        </div>
        <div className="modal-title">
          <h4>The trusted community of buyers and sellers.</h4>
        </div>
        <div className="modal-box modal-buttons">
          <button className="modal-button" onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} /> Continue with Google
          </button>

          <a href="/signup" className="modal-button" onClick={onClose}>
            <FontAwesomeIcon icon={faUserPlus} /> Continue to SignUp
          </a>
          <a href="/Login" className="modal-button" onClick={onClose}>
            <FontAwesomeIcon icon={faEnvelope} /> Continue to Login
          </a>
        </div>
        <div className="modal-terms">
          <p>
            By continuing, you are accepting <a href="#">OLX Terms of use</a>{" "}
            and
            <a href="#"> Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
