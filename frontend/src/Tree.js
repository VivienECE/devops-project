import {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react'
//import { format, formatDistance, formatRelative, subDays } from 'date-fns'
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
// Layout
import { useTheme } from '@material-ui/core/styles';
// Markdown
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Context from './Context'
import {useContext} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import { Tree, TreeNode } from 'react-organizational-chart';
import Man from './man.png';
import Woman from './woman.png';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  card: {
    height: 180,
    width: 200,
    padding: '3px',
    margin:'5px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    position: 'relative',
    float:'none',
    display: 'inline-block',
    backgroundColor:'rgba(200,200,200,.5)',
    '& h5':{
      padding: 0,
      margin: 5,
    },
    '& h6':{
      padding: 0,
      margin: 5,
    },
    '& Button':{
      marginTop: 20,
    },
  },
  modal:{
    border: 'none',
    backgroundColor:'#f1f0ea',
    display: 'flex',
    position: 'relative',
    top: '30%',
    padding:'1em',
    display: 'table',
    textAlign : 'center',
    margin:'auto',
    '& h2':{
      color:'#5a94af',
    },
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

export default forwardRef(({
  department,
  employees,
  onScrollDown,
}, ref) => {
  const styles = useStyles(useTheme())
  const [currentEmployee, setCurrentEmployee] = useState(null)
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })
  //Modify an employee
  const [openModify, setOpenModify] = useState(false); 
  const handleOpenModify = (employee) => { 
    setCurrentEmployee(employee)
    setOpenModify(true);
  };
  const handleCloseModify = () => { 
    setOpenModify(false);
  };
  const [job, setJob] = useState('')
  const handleChangeJob = (e) => {
    setJob(e.target.value)
  }

const modifyJob = (employee) => { if(currentEmployee){return(
  <div align="center" css={styles.modal}>
    <h2>Change {currentEmployee.name} position</h2>
    <fieldset>
      <Select
      value={job}
      onChange={handleChangeJob}
      >
      <MenuItem value='Manager' onChange={handleChangeJob}>Manager</MenuItem>
      <MenuItem value='Director' onChange={handleChangeJob}>Director</MenuItem>
      <MenuItem value='Employee'onChange={handleChangeJob} >Employee</MenuItem>
      <MenuItem value='Intern'onChange={handleChangeJob} >Intern</MenuItem>
    </Select>
    </fieldset>
    
      <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={function(){handleCloseModify()}}>
          Cancel
      </Button>
      <Button color="secondary" variant='contained' type="submit" onClick={async () => {
        await axios.put(`http://localhost:3000/employee/${currentEmployee.id}`, {
          id: currentEmployee.id,
          firstname: currentEmployee.firstname,
          lastname: currentEmployee.lastname,
          email: currentEmployee.email,
          birth: currentEmployee.birth,
          role: job,
          gender: currentEmployee.gender,
          department: currentEmployee.department,
      })
      setJob('')
      setOpenModify(false);
      window.location.reload()
    }}>
          Validate new position
      </Button>
  </div> 
  );}}

  //Delete an employee
  const [openDel, setOpenDel] = useState(false); 
  const handleOpenDel = (employee) => {
    setCurrentEmployee(employee)
    setOpenDel(true);
  };
  const handleCloseDel = () => { 
    setOpenDel(false);
  };

  
  //PASSER EN PARAMETRE L'EMPLOYEE
  const onSubmitDel = async (employee) => {
    axios.delete(`http://localhost:3000/employee/${currentEmployee.id}`)
    axios.delete(`http://localhost:3000/relation/${currentEmployee.responsible[0].id}${currentEmployee.id}`)
  setOpenDel(false);
   window.location.reload()
  }
  
  const deleteEmployee = (employee) => { 
  return(
    <div align="center" css={styles.modal}>
      <h2>Do you really want to dismiss this employee?</h2>
      <form>
        <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={function(){handleCloseDel()}}>
            Cancel
        </Button>
        <Button style={{backgroundColor:'red', color:'white'}} variant='contained' type="submit" onClick={function(){onSubmitDel(employee)}}>
            Dismiss
        </Button>
      </form>
    </div> 
  );}

  const showEmployee = (employee) => {
    if(employee.gender==='Man'){
      return(
        <div css={styles.card}>
            <img src={Man} width="50" height="50"/>
            <h5>{employee.firstname} {employee.lastname} </h5><h5 style={{color:'#5a94af'}}>{employee.role}</h5>
            <h6>{employee.email}</h6>
            <Button variant="contained" size="small" color="secondary" onClick={function(){handleOpenModify(employee)}} style={{marginRight:'10px'}}>Upgrade</Button>
            <Modal open={openModify} onClose={handleCloseModify}>
              {modifyJob(employee)}
            </Modal>
            <Button variant="contained" size="small" color="primary" onClick={function(){handleOpenDel(employee)}}>Dismiss</Button>
            <Modal open={openDel} onClose={handleCloseDel}>
              {deleteEmployee(employee)}
            </Modal>
        </div>
        )
    }
    else{
      return(
        <div css={styles.card}>
            <img src={Woman} width="50" height="50"/>
            <h5>{employee.firstname} {employee.lastname} </h5><h5 style={{color:'#5a94af'}}>{employee.role}</h5>
            <h6>{employee.email}</h6>
            <Button variant="contained" size="small" color="secondary" onClick={function(){handleOpenModify(employee)}} style={{marginRight:'10px'}}>Upgrade</Button>
            <Modal open={openModify} onClose={handleCloseModify}>
              {modifyJob(employee)}
            </Modal>
            <Button variant="contained" size="small" color="primary" onClick={function(){handleOpenDel(employee)}}>Dismiss</Button>
            <Modal open={openDel} onClose={handleCloseDel}>
              {deleteEmployee(employee)}
            </Modal>
        </div>
        )
    }
    
  }
  
  //Recursive nodeTree creation, until no more subordinates
   function recursiveNodeTree(responsible){
    const toreturn = []
    if(responsible)
    if(responsible.subordinates)
      toreturn.push(responsible.subordinates.map((subordinate) => { 
      if(subordinate)
  	return (
  		<TreeNode label={showEmployee(subordinate)}>{recursiveNodeTree(employees.filter(employee => employee.id == subordinate.id)[0])}</TreeNode>
  	)
     }))
   return toreturn
  }
  
   function displayManagerNodeTree(employees){
    const toreturn = []
    toreturn.push(employees.map((employee) => { 
        if(employee.role == "Manager"&&employee.department===department.name)
  	return (
  		<TreeNode label={showEmployee(employee)}>{displayEmployeeNodeTree(employees)}</TreeNode>
  	)
   }))
   return toreturn
  }
  
  function displayEmployeeNodeTree(employees){
    const toreturn = []
    toreturn.push(employees.map((employee) => { 
        if(employee.role == "Employee"&&employee.department===department.name)
  	return (
  		<TreeNode label={showEmployee(employee)}>{displayInternNodeTree(employees)}</TreeNode>
  	)
   }))
   return toreturn
  }
  
   function displayInternNodeTree(employees){
    const toreturn = []
    toreturn.push(employees.map((employee) => { 
        if(employee.role == "Intern" && employee.department===department.name)
  	return (
  		<TreeNode label={showEmployee(employee)}></TreeNode>
  	)
   }))
   return toreturn
  }
  
  
  return (
    <div css={styles.root} ref={rootEl}>
      {employees.map((emp) => {
        if((emp.role==='Director'&&emp.department===department.name)){
          return(
          <Tree
            lineWidth={'3px'}
            lineColor={'rgb(204,204,204)'}
            lineBorderRadius={'10px'}
            css={styles.styledNode}
            label={showEmployee(emp)}
          >{recursiveNodeTree(emp)}
          </Tree>
          )}})}        
          
          {employees.map((emp) => {
          console.log(emp.responsible)
        if((emp.responsible[0]==undefined&&emp.department===department.name&&emp.role!='Director')){
          return(
          <Tree
            lineWidth={'3px'}
            lineColor={'rgb(204,204,204)'}
            lineBorderRadius={'10px'}
            css={styles.styledNode}
            label={showEmployee(emp)}
          >{recursiveNodeTree(emp)}
          </Tree>
          )}})}     
            
      <div ref={scrollEl} />
    </div>
  )
}
)

