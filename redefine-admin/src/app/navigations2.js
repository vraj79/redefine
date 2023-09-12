export const navigations2 =  [
    { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
    
    { name: 'Vendor', path: '/vendors', icon: 'dashboard' },
  
    {
      name: 'Services',
      icon: 'dashboard',
      children: [
        { name: 'Services', iconText: 'SI', path: '/service/home' },
        { name: 'Service Rate Cards', iconText: 'SI', path: '/service/rate-cards' }
      ],
    },
  
  ];
  