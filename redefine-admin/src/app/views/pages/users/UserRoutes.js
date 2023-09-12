import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { AllUsers } from './AllUsers';

// Users
// const {Accounting} = Loadable(lazy(() => import('./users/Accounting')))

const userRoutes = [
  // Users
  {
    path: '/users/accounting',
    element: <AllUsers />,
  },
  {
    path: '/users/create',
    element: <Accounting />,
  },
];

export default userRoutes;
