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
    backgroundColor:'rgba(200,200,200,.5)'
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
  const handleOpenModify = () => { 
    setOpenModify(true);
  };
  const handleCloseModify = () => { 
    setOpenModify(false);
  };
  const [job, setJob] = useState('')
  const handleChangeJob = (e) => {
    setJob(e.target.value)
  }
//PRENDRE L'EMPLOYEE EN PARAMETRE
const modifyJob = (
  <div align="center" css={styles.modal}>
    <h2>Change NAME position</h2>
    <fieldset>
      <Select
      value={job}
      onChange={handleChangeJob}
      >
      <MenuItem value='Manager' onChange={handleChangeJob}>Manager</MenuItem>
      <MenuItem value='Director' onChange={handleChangeJob}>Director</MenuItem>
      <MenuItem value='Employee'onChange={handleChangeJob} >Employee</MenuItem>
    </Select>
    </fieldset>
    
      <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={handleCloseModify}>
          Cancel
      </Button>
      <Button color="secondary" variant='contained' type="submit" onClick={async () => {
        /*axios.put(`http://localhost:3001/departments/${department.id}/employees/${employee.id}`, {
        job: job
      })*/
      setJob('')
      setOpenModify(false);
      window.location.reload()
    }}>
          Validate new position
      </Button>
  </div> 
);

  //Delete an employee
  const [openDel, setOpenDel] = useState(false); 
  const handleOpenDel = () => { 
    setOpenDel(true);
  };
  const handleCloseDel = () => { 
    setOpenDel(false);
  };
  //PASSER EN PARAMETRE L'EMPLOYEE
  const onSubmitDel = async () => {
    /*axios.delete(`http://localhost:3001/departments/${department.id}/employees/${employee.id}`, {
    headers: {
         'Authorization': `Bearer ${oauth.access_token}`
    }
  })*/
  setOpenDel(false);
  window.location.reload()
  }
  const deleteEmployee = (
    <div align="center" css={styles.modal}>
      <h2>Do you really want to dismiss this employee?</h2>
        <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={handleCloseDel}>
            Cancel
        </Button>
        <Button style={{backgroundColor:'red', color:'white'}} variant='contained' type="submit" onClick={onSubmitDel}>
            Dismiss
        </Button>
    </div> 
  );

  const showEmployee = (employee) => {
    return(
    <div css={styles.card}>
        <img src={Man} width="50" height="50"/>
        <h5>{employee.firstname} {employee.lastname} <br/>{employee.role}</h5>
        <Button variant="contained" size="small" color="secondary" onClick={handleOpenModify} style={{marginRight:'10px'}}>Upgrade</Button>
        <Modal css={styles.modal} open={openModify} onClose={handleCloseModify}>
          {modifyJob}
        </Modal>
        <Button variant="contained" size="small" color="primary" onClick={handleOpenDel}>Dismiss</Button>
        <Modal css={styles.modal} open={openDel} onClose={handleCloseDel}>
          {deleteEmployee}
        </Modal>
    </div>
    )
  }
  
  //Recursive nodeTree creation, until no more subordinates
   function recursiveNodeTree(responsible){
    const toreturn = []
    if(responsible)
    if(responsible.subordinates[0] != undefined )
      console.log(responsible.subordinates[0])
      toreturn.push(responsible.subordinates[0].map((subordinate) => { 
      if(subordinate)
  	return (
  		<TreeNode label={showEmployee(subordinate)}>{recursiveNodeTree(employees.filter(employee => employee.id == subordinate.id)[0])}</TreeNode>
  	)
     }))
   return toreturn
  }
  
  return (
    <div css={styles.root} ref={rootEl}>
      {employees.map((emp) => {
        if(emp.role==='Director'&&emp.department===department.name){
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
})

