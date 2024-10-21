import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LiveChat from '../components/LiveChat';
import styles from '../styles/App.module.css';
import SupplyForm from '../components/SupplyForm';
import SupplyList from '../components/SupplyList';

const HomePage: React.FC = () => {
    return (
        <div className={styles.app}>
          <Navbar />
          <SupplyForm/>
          {/* <SupplyList/> */}
          {/* <main className={styles.main}>
            <div className={styles.hero}>
              <h1>Welcome to PrestService</h1>
              <p>Your one-stop solution for all your service needs.</p>
              <button className={styles.ctaButton}>Get Started</button>
            </div>
            <div className={styles.features}>
              <div className={styles.feature}>
                <h2>Quality Products</h2>
                <p>Explore our wide range of high-quality products and supplies.</p>
              </div>
              <div className={styles.feature}>
                <h2>Expert Services</h2>
                <p>Our skilled professionals are ready to assist you with any service you need.</p>
              </div>
              <div className={styles.feature}>
                <h2>Fast Quotes</h2>
                <p>Get quick and accurate quotes for all your service requirements.</p>
              </div>
            </div>
          </main> */}
          <Footer />
          <LiveChat />
        </div>
      );
}

export default HomePage;