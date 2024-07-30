export const BASE_URL="http://localhost:54568/";

//can have api endpoints to fetch fixed values
export const departmentList=['Administration','Management', 'Technology', 'Accounts'];
export const locationList=['Sydney Office','India','UK','USA'];
export const employmentStatusList=['Full Time','Part Time', 'Contractual'];
export const jobTitleList=['Software Engineer','Senior Software Engineer', 'Manager', 'Devops', 'QA'];

export type EmployeeType =
{ 
  id: number;
  firstName: string; 
  lastName: string; 
  empCode: string; 
  gender: string; 
  location: string; 
  dept: string; 
  dob: string; 
  empStatus: string; 
  email: string; 
  doj: string; 
  position: string; 
};

