import React, { useState, useEffect } from 'react';
import FormComponent from '../components/GenericForm';
import { PersonSupply } from '../models/PersonSupply';
import { SupplyService } from '../api/services/SupplyService';
import { PersonService } from '../api/services/PersonService';
import { ServiceService } from '../api/services/ServiceService';
import { Person } from '../models/Person';
import { Supply } from '../models/Supply';
import { Service } from '../models/Service';
import { PersonSupplyId } from '../models/PersonSupply';
import { PersonSupplyService } from '../api/services/PersonSupplyService';

const CustomerPage: React.FC<{ onView: () => void }> = ({ onView }) => {
    const initialData: PersonSupply ={
        id: {} as PersonSupplyId,
        supply: {} as Supply,
        documentNumber: {} as Person,
        service: {} as Service,
        description: ''
    };

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ submit?: string }>({});
    const [supplies, setSupplies] = useState<Supply[]>([]);
    const [person, setPerson] = useState<Person[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [formData, setFormData] = useState<PersonSupply>(initialData);
    const personSupplyService = new PersonSupplyService();
    const supplyService = new SupplyService();
    const personService = new PersonService();
    const serviceService = new ServiceService();

    useEffect(() => {
        const fetchSupplies = async () => {
            try {
                const fetchedSupplies = await supplyService.findAll();
                setSupplies(fetchedSupplies);
                if (fetchedSupplies.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        supply: fetchedSupplies[0]
                    }));
                }
            } catch (error) {
                console.error('Error fetching Supplies:', error);
            }
        };
        fetchSupplies();
    }, []);

    useEffect(() => {
        const fetchPersons = async () => {
            try {
                const fetchedPersons = await personService.findAll();
                setPerson(fetchedPersons);
                if (fetchedPersons.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        person: fetchedPersons[0]
                    }));
                }
            } catch (error) {
                console.error('Error fetching Persons:', error);
            }
        };
        fetchPersons();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const fetchedServices = await serviceService.findAll();
                setServices(fetchedServices);
                if (fetchedServices.length > 0) {
                    setFormData(prev => ({
                        ...prev,
                        person: fetchedServices[0]
                    }));
                }
            } catch (error) {
                console.error('Error fetching Services:', error);
            }
        };
        fetchServices();
    }, []);

    const handleChange = (name: keyof PersonSupply, value: any) => {
        setFormData(prev => {
            if (name === 'supply') {
                const selectedSupply = supplies.find(supply => supply.id.toString() === value);
                return selectedSupply ? { ...prev, supply: selectedSupply } : prev;
            }
            if (name === 'documentNumber') {
                const selectedPerson = person.find(person => person.documentNumber.toString() === value);
                return selectedPerson ? { ...prev, person: selectedPerson } : prev;
            }
            if (name === 'service') {
                const selectedService = services.find(service => service.id.toString() === value);
                return selectedService ? { ...prev, service: selectedService } : prev;
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = async (data: PersonSupply) => {
        setLoading(true);
        setErrors({});
        console.log('Submitting Data:', data);

        try {
            if (!data.supply || data.supply.id === 0) {
                throw new Error('supply is required');
            }
            if (!data.documentNumber || data.documentNumber.documentNumber === null) {
                throw new Error('supply is required');
            }
            if (!data.service || data.service.id === 0) {
                throw new Error('service is required');
            }
            await personSupplyService.create(data);
            onView(); 
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ submit: 'Failed to save supply. Please try again.' });
        } finally {
            setLoading(false);
        }
    };


    const fields = [
        {
            name: 'supply' as const,
            type: 'select',
            label: 'Supply',
            options: supplies.map(supply => ({ 
                value: supply.id.toString(),  // Convert id to string
                label: supply.supplyName,
                key: supply.id.toString()
            }))
        },
        {
            name: 'documentNumber' as const,
            type: 'select',
            label: 'Document Number',
            options: person.map(documentNumber => ({
                value: documentNumber.documentNumber.toString(),  // Ensure value is string
                label: documentNumber.documentNumber,
                key: documentNumber.documentNumber.toString()
            }))
        },
        {
            name: 'service' as const,
            type: 'select',
            label: 'Service',
            options: services.map(service => ({
                value: service.id.toString(),  // Convert id to string
                label: service.name,
                key: service.id.toString()
            }))
        },
        {
            name: 'description' as const,
            type: 'text',
            label: 'Person Supply Description',
            required: true
        }
    ];
    
    
    return (
        <div>
            <FormComponent
                initialData={formData}
                onSubmit={handleSubmit}
                fields={fields}
                title="Purchase"
                onView={onView}
                handleChange={handleChange}
            />
            {loading && <p>Loading...</p>}
            {errors.submit && <span className="error">{errors.submit}</span>}
        </div>
    )

}

export default CustomerPage;