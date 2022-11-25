import { useState, useEffect } from 'react';
import EmployeeService from './components/services/EmployeeService';
import { useNavigate } from "react-router-dom";
const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };
  const navigate=useNavigate();

  const savesignupDetails = (e) =>    { 
    e.preventDefault();
    EmployeeService.signUpEmployee(values).then((response) => {
        console.log(response);
        navigate("/employeeList");
    })
    .catch((error) => {
   console.log(error);
    });

};

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;