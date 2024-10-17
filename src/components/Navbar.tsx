  import React, { useState } from 'react';
  import { Menu, X, User, ShoppingCart, Search } from 'lucide-react';
  import styles from '../styles/Navbar.module.css';
  import LoginPopup from './LoginPopup';

  const Navbar: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const toggleLogin = () => setIsLoginOpen(!isLoginOpen);

    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.logo} onClick={() => window.location.href = '/'}>
            PrestService
          </div>
          <div className={styles.desktopMenu}>
            <div className={styles.dropdown}>
              <span>Products/Supplies</span>
              <div className={styles.dropdownContent}>
                <a href="#">Category 1</a>
                <a href="#">Category 2</a>
                <a href="#">Category 3</a>
              </div>
            </div>
            <a href="#">Services</a>
            <a href="#">Quote Service</a>
            <a href="#">Who We Are</a>
          </div>
          <div className={styles.searchBar}>
            <input type="text" placeholder="Search..." />
            <button><Search size={20} /></button>
          </div>
          <div className={styles.icons}>
            <ShoppingCart className={styles.icon} />
            <User className={styles.icon} onClick={toggleLogin} />
            <Menu className={`${styles.icon} ${styles.menuIcon}`} onClick={toggleSidebar} />
          </div>
        </div>
        <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
          <button className={styles.closeButton} onClick={toggleSidebar}><X /></button>
          <div className={styles.sidebarContent}>
            <div className={styles.sidebarDropdown}>
              <span>Products/Supplies</span>
              <div className={styles.sidebarDropdownContent}>
                <a href="#">Category 1</a>
                <a href="#">Category 2</a>
                <a href="#">Category 3</a>
              </div>
            </div>
            <a href="#">Services</a>
            <a href="#">Quote Service</a>
            <a href="#">Who We Are</a>
          </div>
        </div>
        {isLoginOpen && <LoginPopup onClose={toggleLogin} />}
      </nav>
    );
  };

  export default Navbar;