import styles from './styles/App.module.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from './page/HomePage';
import AdminDashboard from './page/AdminDashboard';
import './styles/globals.css';
import SupplyForm from './components/supply/SupplyForm';
import SupplyList from './components/supply/SupplyList';
import LoginPopup from './components/home/LoginPopup';
import PersonForm from './components/person/PersonForm';
import PersonList from './components/person/PersonList';
import PersonTypeForm from './components/personType/PersonTypeForm';
import PersonTypeList from './components/personType/PersonTypeList';
import PhonePersonForm from './components/phonePerson/PhonePersonForm';
import PhonePersonList from './components/phonePerson/PhonePersonList';
import PhoneTypeForm from './components/phoneType/PhoneTypeForm';
import PhoneTypeList from './components/phoneType/PhoneTypeList';
import RegionForm from './components/region/RegionForm';
import RegionList from './components/region/RegionList';
import ServiceApprovalForm from './components/serviceApproval/ServiceApprovalForm';
import ServiceApprovalList from './components/serviceApproval/ServiceApprovalList';
import ServiceOrderForm from './components/serviceOrder/ServiceOrderForm';
import ServiceOrderList from './components/serviceOrder/ServiceOrderList';
import StatusOrderForm from './components/statusOrder/StatusOrderForm';
import StatusOrderList from './components/statusOrder/StatusOrderList';
import StatusServiceOrderForm from './components/statusServiceOrder/StatusServiceOrderForm';
import StatusServiceOrderList from './components/statusServiceOrder/StatusServiceOrderList';
import WorkOrderDetailsForm from './components/workOrderDetails/WorkOrderDetailsForm';
import WorkOrderDetailsList from './components/workOrderDetails/WorkOrderDetailsList';
import WorkOrderForm from './components/workOrder/WorkOrderForm';
import WorkOrderList from './components/workOrder/WorkOrderList';
// import PersonSupplyForm from './components/personSupply/PersonSupplyForm';

function App() {
  const navigate = useNavigate();

  const handleViewSupplies = () => {
    navigate("/supply-view");
  };

  const handleCloseLoginPopup = () => {
    console.log("Login popup closed");
  };

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/person-form" element={<PersonForm onView={handleViewSupplies} />} />
        <Route path="/person-view" element={<PersonList />} />
        {/* <Route path="/person-supply-form" element={<PersonSupplyForm onView={handleViewSupplies} />} />
        <Route path="/person-supply-view" element={<PersonSupplyList />} /> */}
        <Route path="/person-type-form" element={<PersonTypeForm onView={handleViewSupplies} />} />
        <Route path="/person-type-view" element={<PersonTypeList />} />
        <Route path="/phone-person-form" element={<PhonePersonForm onView={handleViewSupplies} />} />
        <Route path="/phone-person-view" element={<PhonePersonList />} />
        <Route path="/phone-type-form" element={<PhoneTypeForm onView={handleViewSupplies} />} />
        <Route path="/phone-type-view" element={<PhoneTypeList />} />
        <Route path="/region-form" element={<RegionForm onView={handleViewSupplies} />} />
        <Route path="/region-view" element={<RegionList />} />
        <Route path="/service-approval-form" element={<ServiceApprovalForm onView={handleViewSupplies} />} />
        <Route path="/service-approval-view" element={<ServiceApprovalList />} />
        <Route path="/service-order-form" element={<ServiceOrderForm onView={handleViewSupplies} />} />
        <Route path="/service-order-view" element={<ServiceOrderList />} />
        {/* <Route path="/service-service-form" element={<ServiceServiceForm onView={handleViewSupplies} />} />
        <Route path="/service-service-view" element={<ServiceServiceView />} /> */}
        {/* <Route path="/service-supply-form" element={<ServiceSupplyForm onView={handleViewSupplies} />} />
        <Route path="/service-supply-view" element={<ServiceSupplyList />} /> */}
        <Route path="/status-order-form" element={<StatusOrderForm onView={handleViewSupplies} />} />
        <Route path="/status-order-view" element={<StatusOrderList />} />
        <Route path="/status-service-order-form" element={<StatusServiceOrderForm onView={handleViewSupplies} />} />
        <Route path="/status-service-order-view" element={<StatusServiceOrderList />} />
        {/* <Route path="/supply-service-form" element={<SupplyServiceForm onView={handleViewSupplies} />} />
        <Route path="/supply-service-view" element={<SupplyServiceList />} /> */}\
        <Route path="/work-order-detail-form" element={<WorkOrderDetailsForm onView={handleViewSupplies} />} />
        <Route path="/work-order-detail-view" element={<WorkOrderDetailsList />} />
        <Route path="/work-order-form" element={<WorkOrderForm onView={handleViewSupplies} />} />
        <Route path="/work-order-view" element={<WorkOrderList />} />
        <Route path="/supply-form" element={<SupplyForm onView={handleViewSupplies} />} />
        <Route path="/supply-view" element={<SupplyList />} />


      </Routes>
    </div>
  );
}

export default App;
