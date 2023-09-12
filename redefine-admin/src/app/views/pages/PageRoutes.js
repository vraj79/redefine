// import Loadable from 'app/components/Loadable';
// import { lazy } from 'react';
import { Accounting, AllUsers } from './users/AllUsers';
import { DataEntryOperator } from './users/DataEntryOperator';
import { Management } from './users/Management';
import { ProjectManager } from './users/ProjectManager';
import { CreateUser } from './users/CreateUser';
import { Logs } from './master/Logs';

import { Projects } from './projects/Projects';
import { UpdateUser } from './users/UpdateUser';
import { NewUsers } from './users/NewUsers';
// import JwtRegister from '../sessions/JwtRegister';

// Users
// const {Accounting} = Loadable(lazy(() => import('./users/Accounting')))

const pageRoutes = [
  // Users
{
    path: '/users',
    element: <AllUsers />,
  },
{
    path: '/users/new',
    element: <NewUsers />,
  },
{
    path: '/users/create',
    element: <CreateUser />,
  },
{
    path: '/users/update/:id',
    element: <UpdateUser />,
  },
{
    path: '/users/data-entry-operator',
    element: <DataEntryOperator />,
  },
{
    path: '/users/management',
    element: <Management />,
  },
{
    path: '/users/project-manager',
    element: <ProjectManager />,
  },


//  ========== Master ===========


{
    path: '/master/logs',
    element: <Logs />,
  },

  // ==== Projects ====

  {
    path: '/projects',
    element: <Projects/>,
  },
  // {
  //   path: '/projects1',
  //   element: <Projects fill="1" />,
  // },

  // === Vendors ===


  // === Vendors ===

  // === Session ===

  
  // === Session ===




];

export default pageRoutes;
