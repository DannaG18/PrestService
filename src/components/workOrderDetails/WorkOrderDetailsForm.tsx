import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { WorkOrderDetails } from '../../models/WorkOrderDetails';
import { WorkOrderDetailsService } from '../../api/services/WorkOrderDetailsService';
import { Service } from '../../models/Service';
import { WorkOrder } from '../../models/WorkOrder';
import { StatusServiceOrder } from '../../models/StatusServiceOrder';

const WorkOrderDetailsForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: WorkOrderDetails = {
        id: 0,
        assignedService: {} as Service,
        date: '',
        workOrder: {} as WorkOrder,
        statusServiceOrder: {} as StatusServiceOrder 
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [formData, setFormData] = useState<WorkOrderDetails>(initialData);

    const workOrderDetailsService = new WorkOrderDetailsService();

    const handleSubmit = async (data: WorkOrderDetails) => {
        setLoading(true);
        setErrors({});
        try {
            await workOrderDetailsService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save work order details. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'assignedService' as const,
            type: 'text',
            label: 'Assigned Service',
            required: true
        },
        {
            name: 'date' as const,
            type: 'date',
            label: 'Date',
            required: true
        },
        {
            name: 'workOrder' as const,
            type: 'text',
            label: 'Work Order',
            required: true
        },
        {
            name: 'statusServiceOrder' as const,
            type: 'text',
            label: 'Status',
            required: true
        }
    ];

    const handleChange = (name: keyof WorkOrderDetails, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Work Order Details"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default WorkOrderDetailsForm;
