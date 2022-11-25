import React, {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Employee from './Employee';
import EmployeeService from './services/EmployeeService';

const EmployeeList = () => {

const navigate=useNavigate();
const [loading, setLoading]= useState(true);
const [employees, setEmployees] = useState(null);

useEffect(() => {
  const fetchData = async() =>{
    setLoading(true);
    try{
const response=await EmployeeService.getEmployees();
setEmployees(response.data);
    }
    catch(error){
console.log(error);

    }
    setLoading(false);
  };
fetchData();
}   ,[]);

const deleteEmployee = (e,id) =>{
    e.preventDefault();
    EmployeeService.deleteEmployee(id).then((res)=> {  //delete emp from db 
        if(employees){ // checking if emp is there or not, if yes setting the state again 
            setEmployees((prevElement) => {// taking the previous element what was there in the state element  nd filtering out the employee(id) which was deleted from the list 
                return prevElement.filter((employee) => employee.id !==id); // hence the emp is deleted from the state.
            });
        }
    } );
};


  return (
    <div className="container mx-auto my-8">
    <div className="h-12">
        <button onClick={()=> navigate("/addEmployee")} 
        className="rounded bg-slate-600 text-white px-6 py-2 font-semibold">
            Add Employee
        </button>
    </div>
    <div className="flex shadow border-b">
        <table className="min-w-full">
            <thead className="bg-gray-50">
                <tr>
                    <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        FirstName   
                    </th>
                   <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6"> LastName
                    </th>
                    <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">EmailID
                        </th> 
                        <th className="text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6">Actions</th>
                </tr>
            </thead>
            {!loading && (
            <tbody className="bg-white">
                {employees.sort((a, b) =>
    a.firstName < b.firstName ? -1 : 1,
  ).map((employee)=> (
                <Employee 
                employee ={employee} 
                deleteEmployee={deleteEmployee}
                key={employee.id}></Employee>
                ))}
            </tbody>)} 
        </table>

    </div>
    </div>
    );
  
};

export default EmployeeList;