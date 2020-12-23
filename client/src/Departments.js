/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react';
import Context from './Context'
import { useTheme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import { useScrollTrigger } from '@material-ui/core';
import Input from '@material-ui/core/Input';
//import CreateIcon from '@material-ui/icons/Create';
import {Button} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';

const useStyles = (theme) => ({
departments: {
    minWidth: '350px',
    backgroundColor: '#f1f0ea',
    height: '100%',
    margin: 0,
    padding: 0,
    textIndent: 0,
    listStyleType: 0,
    
  },
  department:{
      float:'left',
    '& button':{
      backgroundColor: '#f1f0ea',
      color: '#5a94af',
      border: 'solid rgba(255, 255, 255, .6)', 
      minWidth: '192px',
      textAlign:'left',
      fontSize:'20px',
    },
    padding: '3px',
    margin: '2px',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.1)',
    },
    
    'list-style-type': 'none', 
  },
  modal:{
    border: 'none',
    backgroundColor:'#f1f0ea',
    display: 'flex',
    position: 'relative',
    top: '5%',
    padding:'1em',
    display: 'table',
    textAlign : 'center',
    margin:'auto',
    '& form':{
      padding:'2em',
    },
    '& fieldset': {
          border: 'none',
          marginBottom:'10px',
          '& label': {
            marginBottom: theme.spacing(.5),
            display: 'block',
          },
          '& Input':{
            width:'200px',
            paddingLeft: '20px',
            margin:'2px'
            },
        },
  },
})

export default () => {
  const {employees, setEmployees, departments, setDepartments} = useContext(Context)
  const history = useHistory();
  const styles = useStyles(useTheme())
  
   function getEmployees(){
       return new Promise(function(resolve){
             const employees = []
          axios.get(`http://localhost:3000/employee`)
         .then(function(response){
           setEmployees(response.data.msg)
           response.data.msg.map((employee) => {
         	axios.get(`http://localhost:3000/relation/responsible/${employee.id}`)
         	.then(function(response){
         	        employee.subordinates = []
         		employee.subordinates.push(response.data.msg)
         		employees.push(employee)	
         	})
         })  
         resolve(setEmployees(employees))
       })   
       })
      }
      
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: departments} = await axios.get('http://localhost:3000/department')
        setDepartments(departments.msg)
        await getEmployees()
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [setDepartments])
  
  const [openModal, setOpenModal] = useState(false); 
  const handleOpenModal = () => { 
    setOpenModal(true);
  };
  const handleCloseModal = () => { 
    setOpenModal(false);
  };
  const [name, setName] = useState('')
  const handleChangeName = (e) => {
    setName(e.target.value)
  }

const addDepartment = (
  <div align="center" css={styles.modal}>
    <h2>Add a department</h2>
    <fieldset> 
      Name
      <Input  value={name} onChange={handleChangeName} inputProps={{ 'aria-label': 'description' }} required/>
    </fieldset>
      <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={handleCloseModal}>
          Cancel
      </Button>
      <Button color="secondary" variant='contained' type="submit" onClick={async () => {
        axios.post(`http://localhost:3000/department`, {
        name: name
      })
      setName('')
      setOpenModal(false);
      window.reload()
    }}>
          Validate
      </Button>
  </div> 
);
  return (
    <div>
      <ul style={styles.departments}>
      { departments.map( (department, i) => (
        <li key={i} css={styles.department}>
          <button
            href={`/department/${department.name}`}
            onClick={ (e) => {
              e.preventDefault()
              history.push(`/department/${department.name}`)
            }}
          >
            {department.name}
          </button> 
        </li>
      ))}
    </ul>
    <Button color="secondary" variant='contained' onClick={handleOpenModal}>Add a department</Button>
    <Modal open={openModal} onClose={handleCloseModal}>
      {addDepartment}
    </Modal>
  </div>
  );
}
