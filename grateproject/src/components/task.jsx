import React,{useEffect,useState,useRef} from "react";
import { connect } from "react-redux";
import { deleteTask } from "../redux/action";
import { Redirect } from 'react-router-dom'
import Image from '../components/image'
import image1 from '../images/1.JPG'
import image2 from '../images/2.JPG'
import image3 from '../images/3.JPG'
import image4 from '../images/4.JPG'
import image5 from '../images/5.JPG'
import axios from "axios";

 function mapStateToProps(state)
{
    return{
        taskType:state.tasks.taskType,       
        tasksList: state.tasks.tasksList,
        activeUser:state.users.activeUser,
        usersList:state.users.usersList
    }
}

export default connect(mapStateToProps)(function Task(props)
{
    const {thisTask,tasksList,taskType,dispatch,activeUser,usersList}=props;
  console.log(taskType,"ayalaaaa");
  console.log(thisTask);
// console.log(taskType.find(x=>x.taskTypeId===thisTask.taskTypeId).taskTypeName);
  const [flagImage, setFlagImage] = useState(false)

    const deleteNewTask=async()=>
    {
      try{
        const response=await axios.delete('http://localhost:5000/task/',{thisTask})
      }
      catch(ex){
        throw new Error(ex)
      };
        dispatch(deleteTask(thisTask))
    }
const activeName=usersList.findIndex(x=>x.id===activeUser)
 

return(
    <>
    <div>שם:{thisTask.taskName}   </div>
    <div>תיאור:{thisTask.taskDescription}</div>
    <div>מטפל:{usersList[activeName].firstName}</div>
   {/* <div> סוג משימה:{taskType.find(x=>x.taskTypeId===thisTask.taskTypeId).taskTypeName}</div> */}

    <button onClick={deleteNewTask}>מחיקת המשימה</button>
    <button onClick={() => setFlagImage(!flagImage)}>לצפיה בתמונות</button>
      <br></br>
      {flagImage && <Image>
        <img src={image1} width={800}></img>
        <img src={image2} width={800}></img>
        <img src={image3} width={800}></img>
        <img src={image4} width={800}></img>
        <img src={image5} width={800}></img>
      </Image>}
    <br></br>
    </>
    
)
})