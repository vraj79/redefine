import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/charts/ChartsRoute';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import materialRoutes from 'app/views/material-kit/MaterialRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import pageRoutes from './views/pages/PageRoutes';
import projectRoutes from './views/pages/projects/ProjectRoutes';
import serviceRoutes from './views/pages/services/serviceRoutes';
import masterRoutes from './views/pages/master/masterRoutes';
import clientRoutes from './views/pages/clients/clientRoutes';
import vendorRoutes from './views/pages/vendors/vendorRoutes';
import SettingsRoute from './views/sessions/SettingsRoute'


const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes, ...pageRoutes, ...projectRoutes, ...serviceRoutes, ...masterRoutes, ...clientRoutes, ...vendorRoutes, ...SettingsRoute],
    
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
