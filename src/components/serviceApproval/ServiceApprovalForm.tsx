import React, { useState } from 'react';
import FormComponent from '../GenericForm'; 
import { ServiceApproval } from '../../models/ServiceApproval';
import { ServiceApprovalService } from '../../api/services/ServiceApprovalService';
import { ApprovalStatus } from '../../models/ApprovalStatus';
import { Person } from '../../models/Person';
import { Service } from '../../models/Service';
import { WorkOrder } from '../../models/WorkOrder';

const ServiceApprovalForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: ServiceApproval = {
        id: 0,
        workOrder: {} as WorkOrder,
        clientId: {} as Person,
        service: {} as Service,
        approvalStatus: {} as ApprovalStatus,
        issueDescription: '',
        solutionDescription: '',
    };

    const [formData, setFormData] = useState<ServiceApproval>(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});

    const serviceApprovalService = new ServiceApprovalService();

    const handleChange = (name: keyof ServiceApproval, value: any) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (data: ServiceApproval) => {
        setLoading(true);
        setErrors({});
        try {
            await serviceApprovalService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save service approval. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'workOrder' as const,
            type: 'select', 
            label: 'Work Order',
            required: true,
            options: [], 
        },
        {
            name: 'clientId' as const,
            type: 'select',
            label: 'Client',
            required: true,
            options: [], 
        },
        {
            name: 'service' as const,
            type: 'select', 
            label: 'Service',
            required: true,
            options: [], 
        },
        {
            name: 'approvalStatus' as const,
            type: 'select',
            label: 'Approval Status',
            required: true,
            options: [], 
        },
        {
            name: 'issueDescription' as const,
            type: 'text',
            label: 'Issue Description',
            required: true
        },
        {
            name: 'solutionDescription' as const,
            type: 'text',
            label: 'Solution Description',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Service Approval"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default ServiceApprovalForm;
