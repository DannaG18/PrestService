import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { StatusOrder } from '../../models/StatusOrder';
import { StatusOrderService } from '../../api/services/StatusOrderService';

const StatusOrderForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: StatusOrder = {
        id: 0,
        name: '',
    };

    const [formData, setFormData] = useState<StatusOrder>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});

    const statusOrderService = new StatusOrderService();

    const handleChange = (name: keyof StatusOrder, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (data: StatusOrder) => {
        setLoading(true);
        setErrors({});
        try {
            await statusOrderService.create(data);
            onView();
        } catch (error) {
            setErrors({ submit: 'Failed to save status order. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'name' as const,
            type: 'text',
            label: 'Status Name',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Status Order"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default StatusOrderForm;
