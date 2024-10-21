import React, { useState } from 'react';
import FormComponent from './GenericForm';
import { Supply } from '../models/Supply';
import { SupplyService } from '../api/SupplyService';

const SupplyForm: React.FC = () => {
    const initialData: Supply = {
        id: 0, 
        codInternal: '',
        supplyName: ''
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const supplyService = new SupplyService();

    const handleSubmit = async (data: Supply) => {
        setLoading(true);
        setErrors({}); 
        try {
            await supplyService.create(data);
        } catch (error) {
            console.error('Error saving supply:', error);
            setErrors({ submit: 'Failed to save supply. Please try again.' });
        } finally {
            setLoading(false); // Reset loading state
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

    return (
        <div>
            <FormComponent
                initialData={initialData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Supply"
                redirectPath="/supplies" 
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default SupplyForm;