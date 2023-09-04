import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import React, { useState } from 'react';
import styles from '../page.module.css';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Timestamp } from 'firebase/firestore'

export default function Header() {
  return (
    <div className={styles.header}>
      <div>
        <h1>Checkins</h1>
        <p className={styles.ptext}>Lorem ipsum dolor, something important to say here</p>
      </div>
      <div>
        <BasicModal />
      </div>
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [cin, setCin] = useState({ title: "", url: "" });

  const addCheckIn = async (e) => {
    e.preventDefault();
    if (cin.title !== "" && cin.url !== "") {
      await addDoc(collection(db, "checkins"), {
        title: cin.title,
        url: cin.url,
        postTime: Timestamp.fromDate(new Date())

      });
      setCin({ title: "", url: "" });
      alert("Check In Added");
    }
    else {
      alert("Please enter valid inputs");
    }
  }

  return (
    <div>
      <button variant="contained" className={styles.addButton} onClick={handleOpen}>Add Check In</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className={styles.modalDiv}>
                <div className={styles.modalHeader}>
                    <h2>
                    New Checkin
                    </h2>
                    <button onClick={handleClose} className={styles.crossButton}>
                    X
                    </button>
                </div>
                <div>
                    <div>
                        <input type="text" className={styles.inputDiv} value={cin.title} onChange={(e) => setCin({ ...cin, title: e.target.value })} id="title" name="title" placeholder="Check In Title"/>
                    </div>
                    <div>
                        <input type="text" className={styles.inputDiv} value={cin.url} onChange={(e) => setCin({ ...cin, url: e.target.value })} id="url" name="url"placeholder="Image URL" />
                    </div>
                </div>
                <div className={styles.buttonDiv}>
                    <button className={styles.cancelButton}  onClick={handleClose}>
                    Cancel
                    </button>
                    <button className={styles.addButton} onClick={addCheckIn}>
                    Create Check-in
                    </button>
                </div>
            </div>
        </Box>
      </Modal>
    </div>
  );
}
