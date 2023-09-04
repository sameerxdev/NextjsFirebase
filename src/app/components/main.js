import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import React, { useState, useEffect } from 'react';
import styles from '../page.module.css';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Image from 'next/image';


export default function Main() {
  const [checkins, setCheckins] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedURL, setSelectedURL] = useState('');

  useEffect(() => {
    const q = query(collection(db, "checkins"))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let checkinsArray = [];
      querySnapshot.forEach((doc) => {
        checkinsArray.push({ ...doc.data(), id: doc.id })
      })
      setCheckins(checkinsArray);
    })
  }, [])

  const handleOpenDrawer = (title, url) => {
    setSelectedTitle(title);
    setSelectedURL(url);
  }

  const handleCloseDrawer = () => {
    setSelectedTitle('');
    setSelectedURL('');
  }

  return (
    <div className={styles.mainData}>
      <div className={styles.dataHeading}>
        <p>Title</p>
        <p>Owner</p>
        <p>Status</p>
        <p>Created at</p>
      </div>
      <MuiDrawer isOpen={!!selectedTitle && !!selectedURL} onClose={handleCloseDrawer} title={selectedTitle} url={selectedURL}/>
      {checkins.map((item, id) => (
        <div className={styles.dataDiv} key={id} onClick={() => handleOpenDrawer(item.title, item.url)}>
          <p>{item.title}</p>
          <p>John Doerr</p>
          <div className={styles.checkinText}>
            <p>Checked In</p>
          </div>
          <p>{item.postTime.toDate().toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

const MuiDrawer = ({ isOpen, onClose, title, url }) => {
    function isValidURL(url) {
        const urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
        return urlPattern.test(url);
      }
      
  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <Box p={2} width="250px" textAlign="flex-start" role="presentation">
        <div className={styles.drawerNav}>
            <button onClick={onClose} className={styles.crossButton}>
                    X
            </button>
            <h4>Details</h4>
        </div>
        <h2>
          {title}
        </h2>
        <Image
            src={isValidURL(url) ? url : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='}
            alt={url !== '' && isValidURL(url) ? 'Checkin Image.jpg' : 'Alternate Image Text'}
            height={250} width={250} 
            className={styles.drawerImage}>
        </Image>
      </Box>
    </Drawer>
  )
}
