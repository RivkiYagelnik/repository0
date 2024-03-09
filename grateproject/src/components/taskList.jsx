import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddTask from "./addTask"
import Task from "./task"

import { Redirect, Link, useNavigate } from 'react-router-dom'
import { getTaskList } from "../redux/action"
import { getTaskTypeList } from "../redux/action"
import axios from 'axios'

function mapStateToProps(state) {
  return {
    tasksList: state.tasks.tasksList,
    activeUser: state.users.activeUser
  }
}
export default connect(mapStateToProps)(function TaskList2(props) {
  const { tasksList, UserTaskId, activeUser, dispatch } = props
  const [currentTask, setCurrentTask] = useState(null)
  const newNavigate = useNavigate()

  function addnewtask() {
    newNavigate('/addTask')
  }

  const thisUserTasks = tasksList.filter(x => x.UserTaskId === activeUser);
  
  const getAllTaskType = async () => {   
    try {
      const response = await axios.get('http://localhost:5000/taskType/')    
      if (response.status == 200) {      
        dispatch(getTaskTypeList(response.data))
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  const getAllTasks = async () => {
    
    try {
      const response = await axios.get('http://localhost:5000/task/')    
      if (response.status == 200) {      
        dispatch(getTaskList(response.data))
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getAllTaskType()
    getAllTasks()
  }, [])

  return (
    <>
      <ul>
        {thisUserTasks.map(x => (<li><label>{x.taskName}</label>
          <button onClick={() => setCurrentTask(x.taskId)}
          >לפרטי המשימה:</button><br></br>
          {currentTask === x.taskId && <Task thisTask={x}></Task>}</li>))}
      </ul>
      <br></br>
      <button onClick={addnewtask} >להוספת משימה:</button>
      <br></br>
     
    </>
  )
})
