import { useState } from 'react'
import './App.css'
import AddEmployee from './components/AddEmployee'
import EmployeeList from './components/EmployeeList'

function App() {
  const[addEmpDetailsResponse,setAddEmpDetailsResponse]=useState('')


  return (
    <>
    <AddEmployee setAddEmpDetailsResponse={setAddEmpDetailsResponse}/>
    <EmployeeList addEmpDetailsResponse={addEmpDetailsResponse} />
      
    </>
  )
}

export default App
