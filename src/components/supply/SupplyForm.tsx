import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { Supply } from '../../models/Supply';
import { SupplyService } from '../../api/services/SupplyService';
import styles from '../../styles/App.module.css';
import NavbarAdmis from '../home/NavBarAdmis';

const SupplyForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: Supply = {
        id: 0, 
        codInternal: '',
        supplyName: ''
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const supplyService = new SupplyService();
    const [formData, setFormData] = useState<Supply>(initialData); 

    const handleSubmit = async (data: Supply) => {
        setLoading(true);
        setErrors({});
        try {
            await supplyService.create(data);
            onView(); 
        } catch (error) {
            console.error('Error saving supply:', error);
            setErrors({ submit: 'Failed to save supply. Please try again.' });
        } finally {
            setLoading(false); 
        }
    };

    const fields = [
        {
            name: 'codInternal' as const,
            type: 'text',
            label: 'Internal Code',
            required: true
        },
        {
            name: 'supplyName' as const,
            type: 'text',
            label: 'Supply Name',
            required: true
        }
    ];

    const handleChange = (name: keyof Supply, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className={styles.app}>
            <NavbarAdmis />
            <FormComponent
                initialData={formData} 
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Supply"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default SupplyForm;