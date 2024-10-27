import React, { useState, useRef, useEffect } from 'react';
import { User } from 'lucide-react';
import styles from '../../styles/Navbar.module.css';
import { useAuth } from '../../api/securityservice/AuthenticationContext';

const NavbarCombined: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth(); 

  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => window.location.href = '/'}>
          PrestService
        </div>

        <div className={styles.desktopMenu}>
          <a href="#">Who We Are</a>
        </div>

        <div className={styles.icons}>
          <div className={styles.userMenuContainer} ref={userMenuRef}>
            <User className={styles.icon} onClick={toggleUserMenu} />
            {isUserMenuOpen && (
              <div className={styles.userDropdown}>
                {user && (
                  <>
                    <a className={styles.menuItem}>Profile</a>
                    <button onClick={handleLogout} className={styles.menuItem}>Logout</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCombined;