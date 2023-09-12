import { Vendors } from "./Vendors";
import { VendorAccess } from './VendorAccess';
import { CreateBranch } from './CreateBranch';
import { VendorInfo } from './VendorInfo';
import { UpdateVendorInfo } from './UpdateVendorInfo';
import { UpdateBranch } from './UpdateBranch';
import { CreateContact } from './CreateContact';
import { UpdateContact } from './UpdateContact';
import { CreateVendor } from './CreateVendor';
import { VendorService } from "./VendorService";
import { BranchView } from "./BranchView";
import { ContactView } from "./ContactView";
import { UpdateServiceRateCard } from "./UpdateServiceRateCard";
import { CreateRateCard } from "./CreateRateCard";
import { ServiceRateCards } from "./ServiceRateCards";


const vendorRoutes = [
  {
    path: '/vendors',
    element: <Vendors />,
  },
  {
    path: '/vendors/vendor-access/:id',
    element: <VendorAccess />,
  },
  {
    path: '/vendors/vendor-info/:id',
    element: <VendorInfo />,
  },
  {
    path: '/vendors/update/:id',
    element: <UpdateVendorInfo />,
  },
  {
    path: '/vendors/branch/create/:id',
    element: <CreateBranch />,
  },
  {
    path: '/vendors/branch/:cid/:id',
    element: <BranchView />,
  },
  {
    path: '/vendors/branch/update/:cid/:id',
    element: <UpdateBranch />,
  },
  {
    path: '/vendors/contact/create/:id',
    element: <CreateContact />,
  },
  {
    path: '/vendors/contact/:cid/:id',
    element: <ContactView />,
  },
  {
    path: '/vendors/contact/update/:cid/:id',
    element: <UpdateContact />,
  },
  {
    path: '/vendors/create',
    element: <CreateVendor />,
  },
  {
    path: '/vendors/services/:id',
    element: <VendorService />,
  },
  {
    path: '/vendors/rate-cards',
    element: <ServiceRateCards />,
  },
  {
    path: '/vendors/rate-cards/create',
    element: <CreateRateCard />,
  },
  {
    path: '/vendors/update-rate-card/:id',
    element: <UpdateServiceRateCard />,
  },



];

export default vendorRoutes;





