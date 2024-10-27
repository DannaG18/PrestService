import React, { useState, useEffect } from 'react';
import FormComponent from '../GenericForm'; // Asegúrate de que este componente esté bien definido
import { Company } from '../../models/Company';
import { Service } from '../../models/Service';
import { Branch } from '../../models/Branch';
import { CompanyService } from '../../api/services/CompanyService';
import { ServiceService } from '../../api/services/ServiceService';
import { BranchService } from '../../api/services/BranchService';
import { CompanyService as CompanyServiceModel } from '../../models/CompanyService';

const CompanyServiceForm: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: CompanyServiceModel = {
        embeddedId: {
            company: { id: 0, name: '', companyType: { id: 0, description: '' } },
            service: { id: 0, name: '', requireSupply: false, executionTime: '' }
        },
        service: { id: 0, name: '', requireSupply: false, executionTime: '' },
        branch: { id: 0, nit: '', company: { id: 0, name: '', companyType: { id: 0, description: '' } }, city: { id: 0, region: { id: 0, nameRegion: '', country: {id: 0, nameCountry:''}}, cityName: '' }, branchName: '', creationDate: '' },
        serviceValue: 0
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [companies, setCompanies] = useState<Company[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [formData, setFormData] = useState<CompanyServiceModel>(initialData);

    const companyService = new CompanyService();
    const serviceService = new ServiceService();
    const branchService = new BranchService();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const fetchedCompanies = await companyService.findAll();
                setCompanies(fetchedCompanies);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        const fetchServices = async () => {
            try {
                const fetchedServices = await serviceService.findAll();
                setServices(fetchedServices);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        const fetchBranches = async () => {
            try {
                const fetchedBranches = await branchService.findAll();
                setBranches(fetchedBranches);
            } catch (error) {
                console.error('Error fetching branches:', error);
            }
        };

        fetchCompanies();
        fetchServices();
        fetchBranches();
    }, []);

    const handleChange = (name: keyof CompanyServiceModel, value: any) => {
        if (name === 'embeddedId.company') {
            const selectedCompany = companies.find(company => company.id.toString() === value);
            if (selectedCompany) {
                setFormData(prev => ({
                    ...prev,
                    embeddedId: {
                        ...prev.embeddedId,
                        company: selectedCompany
                    }
                }));
            }
        } else if (name === 'embeddedId.service') {
            const selectedService = services.find(service => service.id.toString() === value);
            if (selectedService) {
                setFormData(prev => ({
                    ...prev,
                    embeddedId: {
                        ...prev.embeddedId,
                        service: selectedService
                    }
                }));
            }
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (data: CompanyServiceModel) => {
        setLoading(true);
        setErrors({});

        try {
            if (!data.embeddedId.company || data.embeddedId.company.id === 0) {
                throw new Error('Company is required');
            }
            if (!data.embeddedId.service || data.embeddedId.service.id === 0) {
                throw new Error('Service is required');
            }
            await companyService.create(data);
            onView();
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save company service. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        {
            name: 'embeddedId.company' as const,
            type: 'select',
            label: 'Company',
            required: true,
            options: companies.map(company => ({
                value: company.id.toString(),
                label: company.name
            }))
        },
        {
            name: 'embeddedId.service' as const,
            type: 'select',
            label: 'Service',
            required: true,
            options: services.map(service => ({
                value: service.id.toString(),
                label: service.name
            }))
        },
        {
            name: 'branch.branchName' as const,
            type: 'text',
            label: 'Branch Name',
            required: true
        },
        {
            name: 'branch.nit' as const,
            type: 'text',
            label: 'NIT',
            required: true
        },
        {
            name: 'serviceValue' as const,
            type: 'number',
            label: 'Service Value',
            required: true
        }
    ];

    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Add New Company Service"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    );
};

export default CompanyServiceForm;





