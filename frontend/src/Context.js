import React, {useState} from 'react'
//import { useCookies } from 'react-cookie'
import axios from 'axios';

const Context = React.createContext()

export default Context;

export const Provider = ({
  children
}) => {
  //const [cookies, setCookie, removeCookie] = useCookies([])
  //const [oauth, setOauth] = useState(cookies.oauth)
  //const [currentUser, setCurrentUser] = useState(null)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [departments, setDepartments] = useState([])
  const [currentDepartment, setCurrentDepartment] = useState(null)
  const [employees, setEmployees] = useState([])

  const fetchDepartment = async () => {
    try{
      const {data: departments} = await axios.put('http://localhost:3000/Departments')
      setDepartments(departments)
    }catch(err){
      console.error(err)
    }
  }
  
  return (
    <Context.Provider value={{
      departments: departments,
      employees:employees,
      setEmployees:setEmployees,
      drawerVisible: drawerVisible,
      setDrawerVisible: setDrawerVisible,
      setDepartments: setDepartments,
      currentDepartment: currentDepartment,
      setCurrentDepartment:  (departmentId) => {
        const department = departments.find( department => department.id === departmentId)
        setCurrentDepartment(department)
      },
      fetchDepartments : fetchDepartment,
    }}>{children}</Context.Provider>
  )
}
