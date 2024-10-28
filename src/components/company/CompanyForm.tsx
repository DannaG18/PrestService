import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm';
import { Company } from '../../models/Company';
import { CompanyType } from '../../models/CompanyType';
import { CompanyService } from '../../api/services/CompanyService';
import { CompanyTypeService } from '../../api/services/CompanyTypeService';

const CompanyForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: Company = {
        id: 0,
        nameCompany: '',
        companyType: {} as CompanyType
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [companyTypes, setCompanyTypes] = useState<CompanyType[]>([]);
    const [formData, setFormData] = useState<Company>(initialData);
    const companyService = new CompanyService();
    const companyTypeService = new CompanyTypeService();

    useEffect(() => {
        const fetchCompanyTypes = async () => {
            try {
                const fetchedCompanyTypes = await companyTypeService.findAll();
                setCompanyTypes(fetchedCompanyTypes);
                if (fetchedCompanyTypes.length > 0) {
                    setFormData(prev => ({
                        ...prev
                    }));
                }
            } catch (error) {
                console.error('Error fetching company types:', error);
            }
        };
        fetchCompanyTypes();
    }, []);

    const handleChange = (name: keyof Company, value: any) => {
        if (name === 'companyType') {
            const selectedType = companyTypes.find(type => type.id.toString() === value);
            if (selectedType) {
                setFormData(prev => ({
                    ...prev,
                    companyType: selectedType
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (data: Company) => {
        setLoading(true);
        setErrors({});

        try {
            if (!data.companyType || data.companyType.id === 0) {
                throw new Error('Company type is required');
            }
            await companyService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save company. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'companyType' as const,
            type: 'select',
            label: 'Company Type',
            required: true,
            options: companyTypes.map(type => ({
                value: type.id.toString(),
                label: type.description
            }))
        },
        {
            name: 'nameCompany' as const,
            type: 'text',
            label: 'Company Name',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Company"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default CompanyForm;
