import axios from "axios";

const EMP_BASE_URL= "http://localhost:8080/api/v1/employees";
const EMP_SIGN_URL= "http://localhost:8080/api/v2/signup";
class EmployeeService

{
saveEmployee(employee){
    return axios.post(EMP_BASE_URL, employee);
}
getEmployees()
{
    return axios.get(EMP_BASE_URL);
}

deleteEmployee(id){
    return axios.delete(EMP_BASE_URL + "/" + id);
}

getEmployeeById(id)
{
    return axios.get(EMP_BASE_URL + "/" + id);

}
updateEmployee(employee,id)
{
    return axios.put(EMP_BASE_URL + "/" + id, employee);
}

signUpEmployee(signup){
    return axios.post(EMP_SIGN_URL, signup);
}
}

export default new EmployeeService();