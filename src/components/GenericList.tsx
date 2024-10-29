import React, { useEffect, useState } from 'react';
import { Trash2, Edit2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '../styles/GenericList.module.css';

interface Entity {
    id: number;
    [key: string]: any;
}

interface EntityField {
    name: string;
    label: string;
    type: string;
}

interface GenericListProps<T extends Entity> {
    entityName: string;
    fields: EntityField[];
    fetchAll: () => Promise<T[]>;
    fetchById: (id: number) => Promise<T>;
    deleteEntity: (id: number) => Promise<void>;
    updateEntity: (entity: T, id: number) => Promise<T>;
    itemsPerPage?: number;
    ConfirmationPopup: React.FC<{
        onCancel: () => void;
        onConfirm: () => void;
        message: string;
    }>;
}

const GenericList = <T extends Entity>({
    entityName,
    fields,
    fetchAll,
    fetchById,
    deleteEntity,
    updateEntity,
    itemsPerPage = 5,
    ConfirmationPopup,
}: GenericListProps<T>) => {
    const [items, setItems] = useState<T[]>([]);
    const [filteredItems, setFilteredItems] = useState<T[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingItem, setEditingItem] = useState<T | null>(null);
    const [editedItem, setEditedItem] = useState<Partial<T>>({});
    const [searchResult, setSearchResult] = useState<T | null>(null);
    const [searchError, setSearchError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<number | null>(null);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const data = await fetchAll();
                setItems(data);
                setFilteredItems(data);
            } catch (error) {
                console.error(`Error fetching ${entityName}:`, error);
            }
        };
        loadItems();
    }, [entityName, fetchAll]);

    const handleDeleteClick = (id: number) => {
        setItemToDelete(id);
        setIsConfirmationOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (itemToDelete !== null) {
            try {
                await deleteEntity(itemToDelete);
                setItems(prevItems => prevItems.filter(item => item.id !== itemToDelete));
                setFilteredItems(prevItems => prevItems.filter(item => item.id !== itemToDelete));
                if (searchResult && searchResult.id === itemToDelete) {
                    setSearchResult(null);
                }
            } catch (error) {
                console.error(`Error deleting ${entityName}:`, error);
            }
        }
        setIsConfirmationOpen(false);
        setItemToDelete(null);
    };

    const handleDeleteCancel = () => {
        setIsConfirmationOpen(false);
        setItemToDelete(null);
    };

    const handleEdit = (item: T) => {
        setEditingItem(item);
        setEditedItem(item);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedItem(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        if (editingItem) {
            try {
                await updateEntity(editedItem as T, editingItem.id);
                setItems(prev =>
                    prev.map(item => (item.id === editingItem.id ? { ...item, ...editedItem } : item))
                );
                setFilteredItems(prev =>
                    prev.map(item => (item.id === editingItem.id ? { ...item, ...editedItem } : item))
                );
                setEditingItem(null);
                setEditedItem({});
            } catch (error) {
                console.error(`Error updating ${entityName}:`, error);
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

            const foundItem = await fetchById(Number(searchTerm));
            setSearchResult(foundItem);
        } catch (error) {
            console.error(`Error searching ${entityName}:`, error);
            setSearchError(`${entityName} not found`);
        }
    };

    // Function to access nested properties
    const getNestedValue = (obj: any, key: string) => {
        return key.split('.').reduce((o, k) => (o || {})[k], obj);
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Function to display boolean values as 'Yes' or 'No'
    const displayBoolean = (value: boolean) => (value ? 'Sí' : 'No');

    return (
        <div className={styles.container}>
            <div className={styles.listContainer}>
                <h2 className={styles.listTitle}>{entityName} Inventory</h2>
                {filteredItems.length === 0 ? (
                    <p className={styles.emptyMessage}>No {entityName.toLowerCase()} registered yet.</p>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {fields.map(field => (
                                        <th key={field.name}>{field.label}</th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((item) => (
                                    <tr key={item.id}>
                                        {fields.map(field => (
                                            <td key={`${item.id}-${field.name}`}>
                                                {editingItem?.id === item.id ? (
                                                    <input
                                                        type={field.type}
                                                        name={field.name}
                                                        value={editedItem[field.name] || ''}
                                                        onChange={handleChange}
                                                        className={styles.editInput}
                                                    />
                                                ) : (
                                                    // Aquí usamos getNestedValue para manejar propiedades anidadas
                                                    field.type === 'boolean' ? displayBoolean(getNestedValue(item, field.name)) : getNestedValue(item, field.name)
                                                )}
                                            </td>
                                        ))}
                                        <td className={styles.actions}>
                                            {editingItem?.id === item.id ? (
                                                <button className={styles.saveButton} onClick={handleSave}>
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className={styles.editButton}
                                                    aria-label={`Edit ${entityName}`}
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            )}
                                            <button
                                                className={styles.deleteButton}
                                                aria-label={`Delete ${entityName}`}
                                                onClick={() => handleDeleteClick(item.id)}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className={styles.pagination}>
                    <button
                        className={styles.paginationButton}
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <span className={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={styles.paginationButton}
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>

            <div className={styles.listContainer}>
                <h2 className={styles.listTitle}>Search {entityName}</h2>
                <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search by ID..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className={styles.searchButton}>
                        <Search size={20} />
                    </button>
                </form>
                {searchResult && (
                    <div className={styles.searchResult}>
                        <h3>{entityName} Found:</h3>
                        <div className={styles.resultDetails}>
                            {fields.map(field => (
                                <div key={field.name}>
                                    <strong>{field.label}:</strong> 
                                    {field.type === 'boolean' ? displayBoolean(getNestedValue(searchResult, field.name)) : getNestedValue(searchResult, field.name)}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {searchError && <p className={styles.errorMessage}>{searchError}</p>}
            </div>

            {isConfirmationOpen && (
                <ConfirmationPopup
                    onCancel={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    message={`Are you sure you want to delete this ${entityName}?`}
                />
            )}
        </div>
    );
};

export default GenericList;

