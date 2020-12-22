/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
//import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react';
import Context from './Context'
import { useTheme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import { useScrollTrigger } from '@material-ui/core';

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
})

export default () => {
  //const {departments, setDepartments} = useContext(Context)
  const history = useHistory();
  const styles = useStyles(useTheme())
  /*useEffect( () => {
    const fetch = async () => {
      try{
        const {data: departments} = await axios.put('http://localhost:3001/departments')
        setDepartments(departments)
      }catch(err){
        console.error(err)
      }
    }
  }, [setDepartments])*/
 const departments = [{name: 'Directorate'}, 
 {name: 'Financial'}, 
 {name: 'Human Ressources'},
 {name: 'IT'},
 {name: 'Marketing'}]
  return (
    <ul style={styles.departments}>
      { departments.map( (department, i) => (
        <li key={i} css={styles.department}>
          <button
            //href={`/departments/${department.id}`}
            onClick={ (e) => {
              e.preventDefault()
              //history.push(`/departments/${department.id}`)
            }}
          >
            {department.name}
          </button> 
        </li>
      ))}
    </ul>
  );
}
