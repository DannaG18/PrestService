import React, { useState } from 'react';
import FormComponent from '../GenericForm';
import { ApprovalStatus } from '../../models/ApprovalStatus';
import { ApprovalStatusService } from '../../api/services/ApprovalStatusService';

const ApprovalStatusForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: ApprovalStatus = { id: 0, nameApprovalStatus: '' };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [formData, setFormData] = useState<ApprovalStatus>(initialData);
    const approvalStatusService = new ApprovalStatusService();

    const handleChange = (name: keyof ApprovalStatus, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (data: ApprovalStatus) => {
        setLoading(true);
        setErrors({});

        try {
            await approvalStatusService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save approval status. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'nameApprovalStatus' as const,
            type: 'text',
            label: 'Approval Status Name',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Approval Status"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default ApprovalStatusForm;
