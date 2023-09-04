'use client'
import styles from './page.module.css'
import Header from "./components/header";
import Main from "./components/main";
import Navbar from "./components/navbar";

export default function Home() {

  return (
    <main className={styles.mainDiv}>
      <Navbar />
      <Header />
      <Main />
    </main>
  );
}