import React from 'react';
import GenericList from '../GenericList';
import { Region } from '../../models/Region';
import { RegionService } from '../../api/services/RegionService';
import ConfirmationPopup from '../ConfirmationPopup';

// Instancia del servicio de regiones
const regionService = new RegionService();

const RegionList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'nameRegion', label: 'Region Name', type: 'text' },
        { name: 'country.nameCountry', label: 'Country Name', type: 'text' }
    ];

    return (
        <GenericList<Region>
            entityName="Region"
            fields={fields}
            fetchAll={regionService.findAll.bind(regionService)}
            fetchById={regionService.findById.bind(regionService)}
            deleteEntity={regionService.delete.bind(regionService)}
            updateEntity={regionService.update.bind(regionService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default RegionList;

