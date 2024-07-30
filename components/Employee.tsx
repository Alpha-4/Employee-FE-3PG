"use client"

import { BASE_URL, EmployeeType, locationList, departmentList,employmentStatusList,jobTitleList } from '@/utils/constants';
import axios, { AxiosError } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';



const Employee: React.FC = () => {

  const params=useParams();
  const router=useRouter();

  const [formData, setFormData] = useState<EmployeeType>({
    id: 0,
    firstName: '',
    lastName: '',
    empCode: '',
    gender: '',
    location: 'Sydney Office',
    dept: 'Administration',
    dob: '',
    empStatus: 'Full Time',
    email: '',
    doj: '',
    position: 'Software Engineer',
  });

  const[processing,setProcessing]=useState(false);
  const[error,setError]=useState<string>();

  
  useEffect(()=>{
      const fetchData = async () =>{
        setProcessing(true);
        try {
          const response= await axios.get(BASE_URL+"employee/"+params.id);
          console.log(JSON.stringify(response.data));
          setFormData(response.data);
          
        } catch (error: any) {
          console.error(error.message);
        }
        setProcessing(false);
      }
      if(params?.id){
        fetchData();
      }
      else return;
    }
  ,[params.id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };


  const onUpdate=(formData: EmployeeType)=> {
    console.log("form updated:" + JSON.stringify(formData));
    const fetchData = async () =>{
      setProcessing(true);
      try {
        const response= await axios.put(BASE_URL+"employee/"+params.id,formData);
        console.log(JSON.stringify(response.data));
        router.push("/edit/"+formData.id);
      } catch (error: any) {
        console.error(error.message);
      }
      setProcessing(false);
    }
    if(params?.id){
      fetchData();
    }
    else return;
  }

  const onCreate=(formData: EmployeeType)=> {
    console.log("form created:" + JSON.stringify(formData));
    const create = async () =>{
      setProcessing(true);
      try {
        const response= await axios.post(BASE_URL+"employee",formData);
        console.log(JSON.stringify(response));
        router.push("/edit/"+response.data.id);
      } catch (error: any) {
        //setError(error.message);
        console.error(JSON.stringify(error));
      }
      setProcessing(false);
    }
    create();
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(params?.id) onUpdate(formData);
    else onCreate(formData);
  };

  return (
    <div className='p-12 flex-col w-max mx-auto'>
    <button className='mb-10 p-4 text-4xl text-green-600 rounded-md' onClick={()=> router.push("/")}>Back</button>
    <h1 className='m-4 p-4 text-4xl text-yellow-600'>Employee Data</h1>
    {error && <h1 className='m-4 p-4 text-4xl text-red-600 '>{error}</h1>}
    <form onSubmit={handleSubmit} className="space-y-4 w-max  bg-gray-400 m-4 p-4 rounded-md">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">First Name(s) *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
          />
        </div>
        <div className="w-full md:w-1/2">
          <label className="block text-sm font-medium text-gray-700">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
          />
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Employee Code *</label>
        <input
          type="text"
          name="empCode"
          value={formData.empCode}
          onChange={handleChange}
          required
          className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Gender *</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === 'Male'}
              onChange={handleChange}
              required
              className="form-radio"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === 'Female'}
              onChange={handleChange}
              required
              className="form-radio"
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Location *</label>
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        >
          {locationList.map(item => (<option value={item} key={item}>{item}</option>))}
        </select>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Department *</label>
        <select
          name="dept"
          value={formData.dept}
          onChange={handleChange}
          required
          className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        >
          {departmentList.map(item => (<option value={item} key={item}>{item}</option>))}
        </select>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Employment Status *</label>
        <select
          name="empStatus"
          value={formData.empStatus}
          onChange={handleChange}
          required
          className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        >
          {employmentStatusList.map(item => (<option value={item} key={item}>{item}</option>))}
        </select>
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Start Date</label>
        <input
          type="date"
          name="doj"
          value={formData.doj}
          onChange={handleChange}
          className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        />
      </div>

      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Position/Job Title</label>
        <select
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="h-12 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base"
        >
          {jobTitleList.map(item => (<option value={item} key={item}>{item}</option>))}
        </select>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={processing}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          { params?.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
    </div>
  );
};

export default Employee;