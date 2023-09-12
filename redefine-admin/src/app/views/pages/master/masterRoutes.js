import { Cities } from './Cities/Cities';
import { CreateCities } from './Cities/CreateCities';
import { UpdateCities } from './Cities/UpdateCities';
import { Countries } from './Countries/Countries';
import { CreateCountries } from './Countries/CreateCountries';
import { UpdateCountries } from './Countries/UpdateCountries';
import { CreateDepartments } from './Departments/CreateDepartments';
import { Departments } from './Departments/Departments';
import { UpdateDepartments } from './Departments/UpdateDepartments';
import { CreateDesignationLevels } from './DesignationLevels/CreateDesignationLevels';
import { DesignationLevels } from './DesignationLevels/DesignationLevels';
import { UpdateDesignationLevels } from './DesignationLevels/UpdateDesignationLevels';
import { CreateEmployeeRanges } from './EmployeeRanges/CreateEmployeeRanges';
import { EmployeeRanges } from './EmployeeRanges/EmployeeRanges';
import { UpdateEmployeeRanges } from './EmployeeRanges/UpdateEmployeeRanges';
import { CreateGroup } from './Groups/CreateGroup';
import { Groups } from './Groups/Groups';
import { UpdateGroup } from './Groups/UpdateGroup';
import { CreateIndustryTypes } from './IndustryTypes/CreateIndustryTypes';
import { IndustryTypes } from './IndustryTypes/IndustryTypes';
import { UpdateIndustryTypes } from './IndustryTypes/UpdateIndustryTypes';
import { CreatePrivilege } from './Privileges/CreatePrivilege';
import { ManageGroupPrivilege } from './Privileges/ManageGroupPrivilege';
import { Privileges } from './Privileges/Privileges';
import { UpdatePrivilege } from './Privileges/UpdatePrivilege';
import { CreateStates } from './States/CreateStates';
import { States } from './States/States';
import { UpdateStates } from './States/UpdateStates';
import { CreateTurnoverRanges } from './TurnoverRanges/CreateTurnoverRanges';
import { TurnoverRanges } from './TurnoverRanges/TurnoverRanges';
import { UpdateTurnoverRanges } from './TurnoverRanges/UpdateTurnoverRanges';

const masterRoutes = [
  {
    path: '/master/groups',
    element: <Groups />,
  },
  {
    path: '/master/groups/create',
    element: <CreateGroup />,
  },
  {
    path: '/master/groups/update/:id',
    element: <UpdateGroup />,
  },
  
  {
    path: '/master/privileges',
    element: <Privileges />,
  },
  {
    path: '/master/privileges/create',
    element: <CreatePrivilege />,
  },
  {
    path: '/master/privileges/update/:id',
    element: <UpdatePrivilege />,
  },
  {
    path: '/master/privileges/manage/group/:id',
    element: <ManageGroupPrivilege />,
  },

  {
    path: '/master/countries',
    element: <Countries />,
  },
  {
    path: '/master/countries/create',
    element: <CreateCountries />,
  },
  {
    path: '/master/countries/update/:id',
    element: <UpdateCountries />,
  },
  

  {
    path: '/master/states',
    element: <States />,
  },
  {
    path: '/master/states/create',
    element: <CreateStates />,
  },
  {
    path: '/master/states/update/:id',
    element: <UpdateStates />,
  },
  

  {
    path: '/master/cities',
    element: <Cities />,
  },
  {
    path: '/master/cities/create',
    element: <CreateCities />,
  },
  {
    path: '/master/cities/update/:id',
    element: <UpdateCities />,
  },

  {
    path: '/master/designation-levels',
    element: <DesignationLevels />,
  },
  {
    path: '/master/designation-levels/create',
    element: <CreateDesignationLevels />,
  },
  {
    path: '/master/designation-levels/update/:id',
    element: <UpdateDesignationLevels />,
  },
  
  {
    path: '/master/employee-ranges',
    element: <EmployeeRanges />,
  },
  {
    path: '/master/employee-ranges/create',
    element: <CreateEmployeeRanges />,
  },
  {
    path: '/master/employee-ranges/update/:id',
    element: <UpdateEmployeeRanges />,
  },
  
  {
    path: '/master/turnover-ranges',
    element: <TurnoverRanges />,
  },
  {
    path: '/master/turnover-ranges/create',
    element: <CreateTurnoverRanges />,
  },
  {
    path: '/master/turnover-ranges/update/:id',
    element: <UpdateTurnoverRanges />,
  },
  
  
  {
    path: '/master/departments',
    element: <Departments />,
  },
  {
    path: '/master/departments/create',
    element: <CreateDepartments />,
  },
  {
    path: '/master/departments/update/:id',
    element: <UpdateDepartments />,
  },
  


  {
    path: '/master/industry-types',
    element: <IndustryTypes />,
  },
  {
    path: '/master/industry-types/create',
    element: <CreateIndustryTypes />,
  },
  {
    path: '/master/industry-types/update/:id',
    element: <UpdateIndustryTypes />,
  },
  
];

export default masterRoutes;
