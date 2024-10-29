import React from 'react';
import GenericList from '../GenericList';
import { Service } from '../../models/Service';
import { ServiceService } from '../../api/services/ServiceService';
import ConfirmationPopup from '../ConfirmationPopup';

const serviceService = new ServiceService();

const ServiceList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'name', label: 'Name', type: 'text' },
        { 
            name: 'requireSupply', 
            label: 'Requires Supply', 
            type: 'boolean', 
            render: (value: boolean) => (value ? 'Yes' : 'No') 
        },
        { name: 'executionTime', label: 'Execution Time', type: 'text' }
    ];

    const fetchServices = async () => {
        try {
            const response = await serviceService.findAll();
            console.log('Response from API:', response); // Agrega este console.log
            return response;
        } catch (error) {
            console.error('Error fetching services:', error);
            return [];
        }
    };

    return (
        <GenericList<Service>
            entityName="Service"
            fields={fields}
            fetchAll={fetchServices} // Usa la función fetchServices
            fetchById={serviceService.findById.bind(serviceService)}
            deleteEntity={serviceService.delete.bind(serviceService)}
            updateEntity={serviceService.update.bind(serviceService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default ServiceList;


