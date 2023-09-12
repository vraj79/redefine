
import { Projects } from './Projects';
import { ProjectInfo } from './ProjectInfo';
import { ManageQuotation } from './ManageQuotation';
import { ManagePo } from './ManagePo';
import { ManageInvoices } from './ManageInvoices';
import { Payments } from './Payments';
import { AddFile } from './AddFile';
import { ManageFinance } from './ManageFinance';
import { UpdateProjectStatus } from './UpdateProjectStatus';
import { ClientInteractions } from './ClientInteractions';
import { UpdateDepartments } from './UpdateDepartments';
import { UpdateProjectInfo } from './UpdateProjectInfo';
import { TryNewEstimate } from './TryNewEstimate';
import { GenerateEstimate } from './GenerateEstimate';
import { EditProject } from './EditProject';
import { ManagePayments } from './ManagePayments';
import { CreateProject } from './CreateProject';
import { ExcelEstimator } from './ExcelEstimator';
import { EstimateCreator } from './EstimateCreator';
import { UserAccess } from './UserAccess';
import { ManageDepartment } from './Department';
import { ManageCities } from './ManageCities';
import { AllEstimates } from './AllEstimates';
import { Estimatepdf } from './Estimatepdf';
import { AddContact } from './AddContact';
import { AddCustomer } from './AddCustomer';
import { CheckOneEstimate } from './CheckOneEstimate';
import { AllEstimatesAll } from './AllEstimatesAll';

// Users
// const {Accounting} = Loadable(lazy(() => import('./users/Accounting')))

const projectRoutes = [

    {
        path: '/projects/project-info/:projectId',
        element: <ProjectInfo />,
      },
      

  {
    path: '/projects/finance_files/:projectId',
    element: <ManageQuotation />,
  },
  {
    path: '/projects/manage_po/:projectId',
    element: <ManagePo />,
  },
  {
    path: '/projects/manage_invoice/:projectId',
    element: <ManageInvoices />,
  },
  {
    path: '/projects/payments/:projectId',
    element: <ManagePayments />,
  },
  {
    path: '/projects/addfile/:projectId',
    element: <AddFile />,
  },
  {
    path: '/projects/manage_finance/:projectId',
    element: <ManageFinance />,
  },
  {
    path: '/projects/project_status/:projectId',
    element: <UpdateProjectStatus />,
  },
  {
    path: '/projects/client_interactions/:projectId',
    element: <ClientInteractions />,
  },
  {
    path: '/projects/update_department/:projectId',
    element: <UpdateDepartments />,
  },
  {
    path: '/projects/update_info/:projectId',
    element: <UpdateProjectInfo />,
  },
  {
    path: '/projects/try_new_estimate/:projectId',
    element: <TryNewEstimate />,
  },
  {
    path: '/projects/generate_estimate/:projectId',
    element: <GenerateEstimate />,
  },
  {
    path: '/projects/edit-project/:projectId',
    element: <EditProject />,
  },
  {
    path: '/projects/create-project',
    element: <CreateProject />,
  },
  {
    path: '/projects/excel-estimator/:projectId',
    element: <ExcelEstimator />,
  },
  {
    path: '/projects/estimate-creator/:projectId',
    element: <EstimateCreator />,
  },
  {
    path: '/projects/project-access/:projectId',
    element: <UserAccess />,
  },
  {
    path: '/projects/manage-department/:projectId',
    element: <ManageDepartment />,
  },
  {
    path: '/projects/cities/:projectId',
    element: <ManageCities />,
  },
  {
    path: '/projects/estimates/all',
    element: <AllEstimatesAll />,
  },
  {
    path: '/projects/estimates/:projectId',
    element: <AllEstimates />,
  },
  {
    path: '/projects/estimates/pdf/:projectId',
    element: <Estimatepdf />,
  },
  {
    path: '/projects/contacts/:projectId',
    element: <AddContact />,
  },
  {
    path: '/projects/customers/:projectId',
    element: <AddCustomer />,
  },
  {
    path: '/projects/estimate-single/:projectId/:estimateId',
    element: <CheckOneEstimate />,
  },


];

export default projectRoutes;
