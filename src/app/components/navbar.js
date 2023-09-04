import styles from '../page.module.css'
import React, { useState, useEffect } from 'react';
import logo from "../../../public/logo.jpg";
import Image from 'next/image';


export default function Navbar() {
    return (
      <div className={styles.navbar}>
        <div>
          <h1>AAA</h1>
        </div>
        <div>
          <ul className={styles.listContainer}>
            <li>Feedback</li>
            <li>Support</li>
            <li>
              <Image
                src={logo}
                alt="Logo"
                width={25}
                height={25}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }