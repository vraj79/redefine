import { CreateRateCard } from './CreateRateCard';
import { CreateService } from './CreateService';
import { Service } from './Service';
import { ServiceRateCards } from './ServiceRateCards';
import { UpdateService } from './UpdateService';
import { UpdateServiceRateCard } from './UpdateServiceRateCard';

const serviceRoutes = [
  {
    path: '/service/home',
    element: <Service />,
  },
  {
    path: '/service/rate-cards',
    element: <ServiceRateCards />,
  },
  {
    path: '/service/rate-cards/create',
    element: <CreateRateCard />,
  },
  {
    path: '/service/create',
    element: <CreateService />,
  },
  {
    path: '/service/update/:id',
    element: <UpdateService />,
  },
  {
    path: '/service/update-rate-card/:id',
    element: <UpdateServiceRateCard />,
  },
];

export default serviceRoutes;
