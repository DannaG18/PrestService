import React, { useState } from 'react';
import styles from '../styles/SupplyForm.module.css';
import { useNavigate } from 'react-router-dom';
import { SupplyService } from '../api/SupplyService'; 
import { Supply as SupplyModel } from '../models/Supply';



const SupplyForm: React.FC = () => {
    const supplyService = new SupplyService(); 
    const navigate = useNavigate();

    // Form inputs
    const [codInternal, setcodInternal] = useState('');
    const [supplyName, setSupplyName] = useState('');
    
    // Lista de suministros para mostrar suministros añadidos
    const [supplies, setSupplies] = useState<SupplyModel[]>([]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            // Crear un nuevo objeto de suministro basado en la entrada del usuario
            const newSupply: Omit<SupplyModel, 'id'> = { codInternal, supplyName };
            
            // Llamar al servicio para crear el nuevo suministro
            const addedSupply = await supplyService.create(newSupply);
            

            alert('Supply added successfully');
            
            // Limpiar los campos del formulario
            setcodInternal('');
            setSupplyName('');
            
            // Opcionalmente añadir el nuevo suministro a la lista mostrada
            setSupplies([...supplies, addedSupply]);
        } catch (error) {
            console.error('Error adding supply:', error);
            alert('Failed to add supply');
        }
    };

    const handleViewClick = () => {
        navigate('/view'); 
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h2 className={styles.formTitle}>Add New Supply</h2>

                    {/* Input para el Código Interno */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="codInternal" className={styles.label}>Internal Code:</label>
                        <input
                            type="text"
                            id="codInternal"
                            className={styles.input}
                            value={codInternal}
                            onChange={(e) => setcodInternal(e.target.value)}
                            required
                        />
                    </div>

                    {/* Input para el Nombre del Suministro */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="supplyName" className={styles.label}>Supply Name:</label>
                        <input
                            type="text"
                            id="supplyName"
                            className={styles.input}
                            value={supplyName}
                            onChange={(e) => setSupplyName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Botón de Envío */}
                    <button type="submit" className={styles.submitButton}>
                        Add Supply
                    </button>
                </form>
            </div>

            {/* Sección de Ver Suministros */}
            <div className={styles.viewContainer}>
                <h2 className={styles.formTitle}>View Added Supplies</h2>
                <button className={styles.viewButton} onClick={handleViewClick}>
                    View Supplies
                </button>
            </div>
        </div>
    );
};

export default SupplyForm;