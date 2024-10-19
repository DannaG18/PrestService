import React from 'react';
import styles from '../styles/SupplyList.module.css';
import { Trash2, Edit2, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const SupplyList: React.FC = () => {
  return (
    <div className={styles.listContainer}>
      <h2 className={styles.listTitle}>Supply Inventory</h2>
      <form className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search supplies..."
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          <Search size={20} />
        </button>
      </form>
      <p className={styles.emptyMessage}>No supplies registered yet.</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.internalCode}>Internal Code</span>
          <span className={styles.supplyName}>Supply Name</span>
          <div className={styles.actions}>
            <button className={styles.editButton} aria-label="Edit Supply">
              <Edit2 size={18} />
            </button>
            <button className={styles.deleteButton} aria-label="Delete Supply">
              <Trash2 size={18} />
            </button>
          </div>
        </li>
      </ul>
      <div className={styles.pagination}>
        <button className={styles.paginationButton}>
          <ChevronLeft size={18} />
        </button>
        <span className={styles.pageInfo}>Page 1 of 1</span>
        <button className={styles.paginationButton}>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default SupplyList;
