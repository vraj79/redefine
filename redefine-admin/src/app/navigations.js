export const navigations =  [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  
  { name: 'Users', path: '/users', icon: 'security' },

 
// Master
  {
    name: 'Master',
    icon: 'security',
    children: [
      { name: 'Groups', iconText: 'SI', path: '/master/groups' },
      { name: 'Privileges', iconText: 'SI', path: '/master/privileges' },
      { name: 'Countries', iconText: 'SI', path: '/master/countries' },
      { name: 'States', iconText: 'SI', path: '/master/states' },
      { name: 'Cities', iconText: 'SI', path: '/master/cities' },
      // { name: 'Logs', iconText: 'SI', path: '/master/logs' },
      { name: 'Designation Levels', iconText: 'SI', path: '/master/designation-levels' },
      { name: 'Service Types', iconText: 'SI', path: '/service/home' },
      { name: 'Employee Ranges', iconText: 'SI', path: '/master/employee-ranges' },
      { name: 'Turnover Ranges', iconText: 'SI', path: '/master/turnover-ranges' },
      { name: 'Departments', iconText: 'SI', path: '/master/departments' },
      { name: 'Industry Types', iconText: 'SI', path: '/master/industry-types' },
    ],
  },



  { name: 'Clients', path: '/customers', icon: 'dashboard' },
  { name: 'Vendors', path: '/vendors', icon: 'dashboard' },

  {
    name: 'Services',
    icon: 'dashboard',
    children: [
      { name: 'Services', iconText: 'SI', path: '/service/home' },
      { name: 'Service Rate Cards', iconText: 'SI', path: '/service/rate-cards' }
    ],
  },


  // { name: 'Services', path: '/master/service-types', icon: 'dashboard' },
  { name: 'Projects', path: '/projects', icon: 'dashboard' },





  // { label: 'Components', type: 'label' },
  // {
  //   name: 'Components',
  //   icon: 'favorite',
  //   badge: { value: '30+', color: 'secondary' },
  //   children: [
  //     { name: 'Auto Complete', path: '/material/autocomplete', iconText: 'A' },
  //     { name: 'Buttons', path: '/material/buttons', iconText: 'B' },
  //     { name: 'Checkbox', path: '/material/checkbox', iconText: 'C' },
  //     { name: 'Dialog', path: '/material/dialog', iconText: 'D' },
  //     { name: 'Expansion Panel', path: '/material/expansion-panel', iconText: 'E' },
  //     { name: 'Form', path: '/material/form', iconText: 'F' },
  //     { name: 'Icons', path: '/material/icons', iconText: 'I' },
  //     { name: 'Menu', path: '/material/menu', iconText: 'M' },
  //     { name: 'Progress', path: '/material/progress', iconText: 'P' },
  //     { name: 'Radio', path: '/material/radio', iconText: 'R' },
  //     { name: 'Switch', path: '/material/switch', iconText: 'S' },
  //     { name: 'Slider', path: '/material/slider', iconText: 'S' },
  //     { name: 'Snackbar', path: '/material/snackbar', iconText: 'S' },
  //     { name: 'Table', path: '/material/table', iconText: 'T' },
  //   ],
  // },
  // {
  //   name: 'Charts',
  //   icon: 'trending_up',
  //   children: [{ name: 'Echarts', path: '/charts/echarts', iconText: 'E' }],
  // },

];
