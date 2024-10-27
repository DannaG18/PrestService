import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { ServiceOrder } from '../../models/ServiceOrder';
import { ServiceOrderService } from '../../api/services/ServiceOrderService';
import { Person } from '../../models/Person';
import { StatusOrder } from '../../models/StatusOrder';

const ServiceOrderForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: ServiceOrder = {
        nroOrden: 0,
        clientId: {} as Person,
        employeeId: {} as Person,
        orderStatus: {} as StatusOrder,
        orderDate: '',
    };

    const [formData, setFormData] = useState<ServiceOrder>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});

    const serviceOrderService = new ServiceOrderService();

    const handleChange = (name: keyof ServiceOrder, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (data: ServiceOrder) => {
        setLoading(true);
        setErrors({});
        try {
            await serviceOrderService.create(data);
            onView();
        } catch (error) {
            setErrors({ submit: 'Failed to save service order. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'nroOrden' as const,
            type: 'number',
            label: 'Order Number',
            required: true
        },
        {
            name: 'clientId' as const,
            type: 'select',
            label: 'Client',
            required: true,
            options: [],
        },
        {
            name: 'employeeId' as const,
            type: 'select',
            label: 'Employee',
            required: true,
            options: [],
        },
        {
            name: 'orderStatus' as const,
            type: 'select',
            label: 'Order Status',
            required: true,
            options: [],
        },
        {
            name: 'orderDate' as const,
            type: 'date',
            label: 'Order Date',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Service Order"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default ServiceOrderForm;
