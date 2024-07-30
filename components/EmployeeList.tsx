"use client"
import { BASE_URL, EmployeeType } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EmployeeList: React.FC  = () => {
    const [data, setData] = useState<EmployeeType[]>();
    const [error, setError] = useState("");
    const [loading,setLoading]=useState(false);

    const router=useRouter();

    const onAddEmployee=()=>{
      router.push("/add");
    }
  
    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try {
              const response = await axios.get(BASE_URL+"employee");
              console.log(JSON.stringify(response.data));
              setData(response.data);
              
            } catch (error: any) {
              console.error(error.message);
            }
            setLoading(false);
          }
      
          fetchData();
        }, []);
     
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error:</div>;
  
    return (

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex-col">
        <button onClick={onAddEmployee} type="button" className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900">Add Employee</button>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" className="px-6 py-3">
                          FirstName
                      </th>
                      <th scope="col" className="px-6 py-3">
                          Employee Code
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Delete</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
              { data &&
                data.map(item=>(
                  <tr key={item?.empCode} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {item.firstName}
                      </th>
                      <td className="px-6 py-4">
                          {item.empCode}
                      </td>
                      <td className="px-6 py-4 text-right">
                          <a href={"/edit/"+item.id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                      </td>
                      <td className="px-6 py-4 text-right">
                      <a href={"/delete/"+item.id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                      </td>
                  </tr>
                ))}  
              </tbody>
          </table>
      </div>

    );
}

export default EmployeeList