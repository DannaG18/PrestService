import React from 'react';
import GenericList from '../GenericList';
import { City } from '../../models/City';
import { CityService } from '../../api/services/CityService';
import ConfirmationPopup from '../ConfirmationPopup';

const cityService = new CityService();

const CityList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'nameCity', label: 'City Name', type: 'text' },
        { name: 'region.nameRegion', label: 'Region', type: 'text' },
        { name: 'region.country.nameCountry', label: 'Country', type: 'text' }
    ];

    return (
        <GenericList<City>
            entityName="City"
            fields={fields}
            fetchAll={cityService.findAll.bind(cityService)}
            fetchById={cityService.findById.bind(cityService)}
            deleteEntity={cityService.delete.bind(cityService)}
            updateEntity={cityService.update.bind(cityService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default CityList;
