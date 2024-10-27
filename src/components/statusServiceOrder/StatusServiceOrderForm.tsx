import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { StatusServiceOrder } from '../../models/StatusServiceOrder';
import { StatusServiceOrderService } from '../../api/services/StatusServiceOrderService';

const StatusServiceOrderForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: StatusServiceOrder = {
        id: 0,
        name: '',
    };

    const [formData, setFormData] = useState<StatusServiceOrder>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});

    const statusServiceOrderService = new StatusServiceOrderService();

    const handleChange = (name: keyof StatusServiceOrder, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (data: StatusServiceOrder) => {
        setLoading(true);
        setErrors({});
        try {
            await statusServiceOrderService.create(data);
            onView();
        } catch (error) {
            setErrors({ submit: 'Failed to save status service order. Please try again.' });
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
                title="Add New Status Service Order"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default StatusServiceOrderForm;
