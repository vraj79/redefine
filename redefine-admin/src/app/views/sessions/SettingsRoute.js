import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import JwtVerify from './JwtVerify';
import { Settings } from './Settings';


const SettingsRoute = [
  { path: '/session/settings', element: <Settings /> },
];

export default SettingsRoute;
