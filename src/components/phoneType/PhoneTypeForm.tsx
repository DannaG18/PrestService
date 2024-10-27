import React, { useState } from 'react';
import FormComponent from '../GenericForm'; 
import { PhoneType } from '../../models/PhoneType';
import { PhoneTypeService } from '../../api/services/PhoneTypeService';

const PhoneTypeForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: PhoneType = {
        id: 0, 
        description: '',
    };

    const [formData, setFormData] = useState<PhoneType>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const phoneTypeService = new PhoneTypeService();

    const handleChange = (name: keyof PhoneType, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (data: PhoneType) => {
        setLoading(true);
        setErrors({});
        try {
            await phoneTypeService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save phone type. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'description' as const,
            type: 'text',
            label: 'Phone Type Description',
            required: true
        },
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Phone Type"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default PhoneTypeForm;
