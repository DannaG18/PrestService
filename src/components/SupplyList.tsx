import React from 'react';
import GenericList from './GenericList';
import { Supply } from '../models/Supply';

const supplyKeys = {
    id: 'id',
    name: 'supplyName',
    internalCode: 'codInternal',
  };
  

const SupplyInventory = () => {
  return (
    <GenericList<Supply>
      entityName="Supply"
      entityService={supplyService}
      entityKeys={supplyKeys}
    />
  );
};

export default SupplyInventory;
