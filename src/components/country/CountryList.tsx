import React from 'react';
import GenericList from '../GenericList';
import { Country } from '../../models/Country';
import { CountryService } from '../../api/services/CountryService';
import ConfirmationPopup from '../ConfirmationPopup';

// Instancia del servicio
const countryService = new CountryService();

const CountryList: React.FC = () => {
    const fields = [
        { name: 'id', label: 'ID', type: 'text' },
        { name: 'nameCountry', label: 'Country Name', type: 'text' }
    ];

    return (
        <GenericList<Country>
            entityName="Country"
            fields={fields}
            fetchAll={countryService.findAll.bind(countryService)}
            fetchById={countryService.findById.bind(countryService)}
            deleteEntity={countryService.delete.bind(countryService)}
            updateEntity={countryService.update.bind(countryService)}
            itemsPerPage={5}
            ConfirmationPopup={ConfirmationPopup}
        />
    );
};

export default CountryList;
