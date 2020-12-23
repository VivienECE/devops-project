/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react';
import {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {useState} from 'react';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import CreateIcon from '@material-ui/icons/Create';
import {Button} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import avatarWoman from './woman.png';
import avatarMan from './man.png';
import avatarNone from './none.png';
import Radio from '@material-ui/core/Radio';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';



const styles = {
  root: {
    backgroundColor: '#f1f0ea',
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    textAlign: 'left',
    minWidth: '500px',
    flexDirection: 'column',
    '& Input':{
      width:'200px',
      paddingLeft: '20px',
      margin:'2px'
      },
  },
}


const CreateEmployee = (department) => { 
  const [avatar, setAvatar] = useState(avatarNone)

//Firstname
  const [firstname, setFirstname] = useState('')
  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value)
  }

//Lastname
  const [lastname, setLastname] = useState('')
  const handleChangeLastname = (e) => {
    setLastname(e.target.value)
  }

//gender
const [gender, setGender] = useState('')
  const handleChangeGender = (e) => {
    setGender(e.target.value)
    if(e.target.value == "Man")
      setAvatar(avatarMan)
    if(e.target.value == "Woman")
      setAvatar(avatarWoman)
  }

//job
const [job, setJob] = useState('')
const handleChangeJob = (e) => {
  setJob(e.target.value)
}

//email
const [email, setEmail] = useState('')
  const handleChangeE = (e) => {
    setEmail(e.target.value)
  }
//birth
  const [birth, setBirth] = useState('')
  const handleChangeB = (e) => {
    setBirth(e.target.value)
  }
//save all fields
  const Save = async () => {
    await axios.post(`http://localhost:3000/employee`, {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      job: job,
      department: department,
      email: email,
      birth: birth
    })
  }

	return (
    <div css={styles.root}>
      <h2 align="center" style={{color:'#5a94af',}}>Add a new employee</h2><br/>
          <form> 
            <img src={avatar} width="150" height="150" style={{borderRadius: '50%', marginRight: '10px', float:'left'}}></img>
            <fieldset>
              Firstname  
              <Input value={firstname} onChange={handleChangeFirstname} inputProps={{ 'aria-label': 'description' }} required/>
            </fieldset>
            <fieldset>
              Lastname  
              <Input value={lastname} onChange={handleChangeLastname} inputProps={{ 'aria-label': 'description' }} required/>
            </fieldset>
            <fieldset> 
              Gender
                <Radio
                  checked={gender === 'Man'}
                  onChange={handleChangeGender}
                  value="Man"
                /> Man
                <Radio
                  checked={gender === 'Woman'}
                  onChange={handleChangeGender}
                  value="Woman"
                /> Woman
            </fieldset>
            <fieldset> Job                                       
                <Select
                  value={job}
                  onChange={handleChangeJob}
                  style={{paddingLeft:'20px'}}
                >
                <MenuItem value='Manager' onChange={handleChangeJob}>Manager</MenuItem>
                <MenuItem value='Director' onChange={handleChangeJob}>Director</MenuItem>
                <MenuItem value='Employee'onChange={handleChangeJob} >Employee</MenuItem>
                <MenuItem value='Intern'onChange={handleChangeJob} >Intern</MenuItem>
            </Select>
            </fieldset>
            <fieldset>
              Email  
              <Input value={email} type='email' onChange={handleChangeE} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              Date of birth  
              <Input value={birth} width='100px' type='date'  onChange={handleChangeB} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
          </form>
        <Button color='secondary' variant='contained' style={{ float: 'right' }} onClick={Save}>Save</Button>
    </div>
  	)
}

export default CreateEmployee;
