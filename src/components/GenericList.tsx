import React, { useEffect, useState } from 'react';
import styles from '../styles/EntityList.module.css';
import { Trash2, Edit2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import ConfirmationPopup from './ConfirmationPopup';

// Generic type T for the entity
interface GenericListProps<T> {
  entityName: string; // For display titles like "Supply Inventory"
  entityService: {
    findAll: () => Promise<T[]>;
    findById: (id: number) => Promise<T | null>;
    update: (item: Partial<T>, id: number) => Promise<void>;
    delete: (id: number) => Promise<void>;
  };
  entityKeys: {
    id: keyof T;
    name: keyof T;
    internalCode: keyof T;
  };
}

const GenericList = <T extends { [key: string]: any }>({
  entityName,
  entityService,
  entityKeys,
}: GenericListProps<T>) => {
  const [entities, setEntities] = useState<T[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEntities, setFilteredEntities] = useState<T[]>([]);
  const [editingEntity, setEditingEntity] = useState<T | null>(null);
  const [editedEntity, setEditedEntity] = useState<Partial<T>>({});
  const [searchResult, setSearchResult] = useState<T | null>(null);
  const [searchError, setSearchError] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const entitiesPerPage = 5;
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const data = await entityService.findAll();
        setEntities(data);
        setFilteredEntities(data);
      } catch (error) {
        console.error(`Error fetching ${entityName.toLowerCase()}s:`, error);
      }
    };

    fetchEntities();
  }, [entityService, entityName]);

  const handleDeleteClick = (id: number) => {
    setEntityToDelete(id);
    setIsConfirmationOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (entityToDelete !== null) {
      try {
        await entityService.delete(entityToDelete);
        setEntities((prevEntities) =>
          prevEntities.filter((entity) => entity[entityKeys.id] !== entityToDelete)
        );
        setFilteredEntities((prevEntities) =>
          prevEntities.filter((entity) => entity[entityKeys.id] !== entityToDelete)
        );
        if (searchResult && searchResult[entityKeys.id] === entityToDelete) {
          setSearchResult(null);
        }
      } catch (error) {
        console.error(`Error deleting ${entityName.toLowerCase()}:`, error);
      }
    }
    setIsConfirmationOpen(false);
    setEntityToDelete(null);
  };

  const handleDeleteCancel = () => {
    setIsConfirmationOpen(false);
    setEntityToDelete(null);
  };

  const handleEdit = (entity: T) => {
    setEditingEntity(entity);
    setEditedEntity(entity);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedEntity((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (editingEntity) {
      try {
        await entityService.update(editedEntity as T, editingEntity[entityKeys.id]);
        setEntities((prev) =>
          prev.map((entity) =>
            entity[entityKeys.id] === editingEntity[entityKeys.id]
              ? { ...entity, ...editedEntity }
              : entity
          )
        );
        setFilteredEntities((prev) =>
          prev.map((entity) =>
            entity[entityKeys.id] === editingEntity[entityKeys.id]
              ? { ...entity, ...editedEntity }
              : entity
          )
        );
        setEditingEntity(null);
        setEditedEntity({});
      } catch (error) {
        console.error(`Error updating ${entityName.toLowerCase()}:`, error);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchError('');
    setSearchResult(null);

    try {
      if (!searchTerm || isNaN(Number(searchTerm))) {
        setSearchError('Please enter a valid numeric ID');
        return;
      }

      const foundEntity = await entityService.findById(Number(searchTerm));
      setSearchResult(foundEntity);
    } catch (error) {
      console.error(`Error searching ${entityName.toLowerCase()}:`, error);
      setSearchError(`${entityName} not found`);
    }
  };

  const indexOfLastEntity = currentPage * entitiesPerPage;
  const indexOfFirstEntity = indexOfLastEntity - entitiesPerPage;
  const currentEntities = filteredEntities.slice(indexOfFirstEntity, indexOfLastEntity);
  const totalPages = Math.ceil(filteredEntities.length / entitiesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        <h2 className={styles.listTitle}>{entityName} Inventory</h2>
        {filteredEntities.length === 0 ? (
          <p className={styles.emptyMessage}>No {entityName.toLowerCase()}s registered yet.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <div className={styles.tableGrid}>
              <div className={styles.tableHeader}>ID</div>
              <div className={styles.tableHeader}>Internal Code</div>
              <div className={styles.tableHeader}>{entityName} Name</div>
              <div className={styles.tableHeader}>Actions</div>
              {currentEntities.map((entity) => (
                <React.Fragment key={entity[entityKeys.id]}>
                  <div className={styles.tableCell}>{entity[entityKeys.id]}</div>
                  <div className={styles.tableCell}>
                    {editingEntity?.[entityKeys.id] === entity[entityKeys.id] ? (
                      <input
                        type="text"
                        name={String(entityKeys.internalCode)}
                        value={editedEntity[entityKeys.internalCode] || ''}
                        onChange={handleChange}
                        className={styles.editInput}
                      />
                    ) : (
                      entity[entityKeys.internalCode]
                    )}
                  </div>
                  <div className={styles.tableCell}>
                    {editingEntity?.[entityKeys.id] === entity[entityKeys.id] ? (
                      <input
                        type="text"
                        name={String(entityKeys.name)}
                        value={editedEntity[entityKeys.name] || ''}
                        onChange={handleChange}
                        className={styles.editInput}
                      />
                    ) : (
                      entity[entityKeys.name]
                    )}
                  </div>
                  <div className={styles.actions}>
                    {editingEntity?.[entityKeys.id] === entity[entityKeys.id] ? (
                      <button className={styles.saveButton} onClick={handleSave}>
                        Save
                      </button>
                    ) : (
                      <button
                        className={styles.editButton}
                        aria-label={`Edit ${entityName}`}
                        onClick={() => handleEdit(entity)}
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                    <button
                      className={styles.deleteButton}
                      aria-label={`Delete ${entityName}`}
                      onClick={() => handleDeleteClick(entity[entityKeys.id])}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        <div className={styles.pagination}>
          <button className={styles.paginationButton} onClick={handlePrevPage} disabled={currentPage === 1}>
            <ChevronLeft size={18} />
          </button>
          <span className={styles.pageInfo}>Page {currentPage} of {totalPages}</span>
          <button className={styles.paginationButton} onClick={handleNextPage} disabled={currentPage === totalPages}>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      <div className={styles.listContainer}>
        <h2 className={styles.listTitle}>Search {entityName} by ID</h2>
        <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter ID"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton} aria-label="Search">
            <Search size={20} />
          </button>
        </form>
        {searchError && <p className={styles.errorMessage}>{searchError}</p>}
        {searchResult ? (
          <div className={styles.searchResult}>
            <h3>Search Result</h3>
            <p>ID: {searchResult[entityKeys.id]}</p>
            <p>Internal Code: {searchResult[entityKeys.internalCode]}</p>
            <p>{entityName} Name: {searchResult[entityKeys.name]}</p>
            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteClick(searchResult[entityKeys.id])}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ) : (
          searchTerm && <p>No results found.</p>
        )}
      </div>
      {isConfirmationOpen && (
        <ConfirmationPopup
          message={`Are you sure you want to delete this ${entityName.toLowerCase()}?`}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteCancel}
        />
      )}
    </div>
  );
};

export default GenericList;
