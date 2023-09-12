import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import JwtVerify from './JwtVerify';
import { Settings } from './Settings';

const NotFound = Loadable(lazy(() => import('./NotFound')));
const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));

const sessionRoutes = [
  { path: '/session/signup', element: <JwtRegister /> },
  { path: '/session/signin', element: <JwtLogin /> },
  { path: '/session/forgot-password', element: <ForgotPassword /> },
  { path: '/session/404', element: <NotFound /> },
  { path: '/session/verify-email', element: <JwtVerify /> },
  { path: '/session/settings', element: <Settings /> },
];

export default sessionRoutes;