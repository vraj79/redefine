export const navigations = [
    { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
    // { label: 'PAGES', type: 'label' },
    // {
    //   name: 'Session/Auth',
    //   icon: 'security',
    //   children: [
    //     // { name: 'Sign in', iconText: 'SI', path: '/session/signin' },
    //     // { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
    //     // { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
    //     // { name: 'Error', iconText: '404', path: '/session/404' },
    //   ],
    // },
  
    // User
    {
      name: 'Users',
      icon: 'security',
      children: [
        { name: 'Accounting', iconText: 'SI', path: '/users/accounting' },
        { name: 'Administrator', iconText: 'SI', path: '/users/administrator' },
        { name: 'Data Entry Operator', iconText: 'SI', path: '/users/data-entry-operator' },
        { name: 'Management', iconText: 'SI', path: '/users/management' },
        { name: 'Project Manager', iconText: 'SI', path: '/users/project-manager' },
        { name: 'Super Administrator', iconText: 'SI', path: '/users/superadministrator' },
  
  
  
        // { name: 'Sign up', iconText: 'SU', path: '/session/signup' },
        // { name: 'Forgot Password', iconText: 'FP', path: '/session/forgot-password' },
        // { name: 'Error', iconText: '404', path: '/session/404' },
      ],
    },
  
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
  
  // Projects
    // {
    //   name: 'Projects',
    //   icon: 'security',
    //   children: [
    //     { name: 'Projects', iconText: 'SI', path: '/projects' },
       
    //   ],
    // },
  
    { name: 'Vendor', path: '/vendors', icon: 'dashboard' },
  
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
    // {
    //   name: 'Documentation',
    //   icon: 'launch',
    //   type: 'extLink',
    //   path: 'http://demos.ui-lib.com/matx-react-doc/',
    // },
  ];
  