import { CustomerAccess } from './CustomerAccess';
import { CreateBranch } from './CreateBranch';
import { CustomerInfo } from './CustomerInfo';
import { Clients } from './Customers';
import { UpdateCustomerInfo } from './UpdateCustomerInfo';
import { UpdateBranch } from './UpdateBranch';
import { CreateContact } from './CreateContact';
import { UpdateContact } from './UpdateContact';
import { CreateCustomer } from './CreateCustomer';
import { BranchView } from './BranchView';
import { ContactView } from './ContactView';

const clientRoutes = [
  {
    path: '/customers',
    element: <Clients />,
  },
  {
    path: '/customers/customer-access/:id',
    element: <CustomerAccess />,
  },
  {
    path: '/customers/customer-info/:id',
    element: <CustomerInfo />,
  },
  {
    path: '/customers/update/:id',
    element: <UpdateCustomerInfo />,
  },
  {
    path: '/customers/branch/create/:id',
    element: <CreateBranch />,
  },
  {
    path: '/customers/branch/update/:cid/:id',
    element: <UpdateBranch />,
  },
  {
    path: '/customers/contact/create/:id',
    element: <CreateContact/>,
  },
  {
    path: '/customers/contact/update/:cid/:id',
    element: <UpdateContact />,
  },
  {
    path: '/customers/create',
    element: <CreateCustomer />,
  },
  {
    path: '/customers/branch/:cid/:id',
    element: <BranchView />,
  },
  {
    path: '/customers/contact/:cid/:id',
    element: <ContactView />,
  }
  
 
  
];

export default clientRoutes;
