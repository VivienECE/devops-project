import {useContext, useRef, useState} from 'react';
//import axios from 'axios';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
// Layout
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// Local
//import { useHistory, useParams } from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import Tree from './Tree'
import CreateEmployee from './CreateEmployee'
import Context from './Context'

const useStyles = (theme) => ({
  root: {
    height: '500px',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255,255,255,.9)',
    position: 'relative',
  },
  top:{
    textAlign: 'center',
    //color:'#ffe0b2',
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
        },
  },
})

export default () => {
  
  //const history = useHistory()
  //const { id } = useParams()
  const styles = useStyles(useTheme())
  const {departments, setDepartments} = useContext(Context)
  const {employees, setEmployees} = useState([])
  const listRef = useRef()
  const departmentId = useRef()
  //const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  /*const fetchDepartments = async () => {
    try{
      const {data: departments} = await axios.put('http://localhost:3001/departments')
      setChannels(departments)
    }catch(err){
      console.error(err)
    }
  }
  const department = departments.find( department => department.id === id)
  const [employees, setEmployees] = useState([])
  const fetchEmployees = async () => {
    setEmployees([])
    const {data: employees} = await axios.get(`http://localhost:3001/department/${department.id}/employees`)
    setEmployees(employees)
  }
  if(!department) {
    history.push('/')
    return <div/>
  }
  
  if(departmentId.current !== department.id){
    departmentsId.current = department.id
  }*/

  const department={name: 'Directorate'}
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  
  //Add an employee
  const [openAdd, setOpenAdd] = useState(false); 
  const handleOpenAdd = () => { 
    setOpenAdd(true);
    console.log('open')
  };
  const handleCloseAdd = () => { 
    setOpenAdd(false);
  };
  
  const newEmployee = (
        <div align="center" css={styles.modal}>
            <CreateEmployee />
        </div> 
  );


  return (
    <div css={styles.root}>
      <div css={styles.top}>
        <Button onClick={handleOpenAdd} style={{ float: 'right' }}>
          <PersonAddIcon fontSize="large" style={{ color: '#5a94af' }}/>
        </Button>
        <Modal open={openAdd} onClose={handleCloseAdd}>
          {newEmployee}
        </Modal>
        <h2>{department.name}</h2>
      </div>
      <Tree
        department={department}
        employees={employees}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
    </div>
  );
}
