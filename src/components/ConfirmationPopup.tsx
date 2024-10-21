import React from 'react';
import styles from '../styles/ConfirmationPopup.module.css';

interface ConfirmationPopupProps {
  // isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({  onClose, onConfirm, message }) => {
  // if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttonContainer}>
          <button
            onClick={onClose}
            className={`${styles.button} ${styles.cancelButton}`}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`${styles.button} ${styles.deleteButton}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;