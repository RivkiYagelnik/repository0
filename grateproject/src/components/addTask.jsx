import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux"
import { addTask } from "../redux/action";
import { Redirect, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { FormControl, MenuItem, Select } from "@mui/material";
import axios from 'axios'


function mapStateToProps(state) {
    return {
        taskType: state.tasks.taskType,
        tasksList: state.tasks.tasksList,
        activeUser: state.users.activeUser
    }
}

export default connect(mapStateToProps)(function AddTask(props) {
    const [TaskType, setTaskType] = useState('')
    const { taskType, tasksList, setFlag, dispatch, UserTaskId, activeUser } = props;
    const [value, setValue] = React.useState();
    let taskIdRef = useRef('');
    let taskTypeIdRef = useRef('');
    let taskNameRef = useRef('');
    let taskDescriptionRef = useRef('');
    const newNavigate = useNavigate()

    const handleChange = (e) => {
        setTaskType(e.target.value)
    }

    const addNewTask = async () => {
        let indexSelectOption = taskType.find(x => x.taskTypeName == taskTypeIdRef.current.value)?.taskTypeId
        try {
            const response = await axios.post('http://localhost:5000/task/', {
                id: taskIdRef.current.value,
                taskTypeId: taskTypeIdRef.current.value,
                taskName: taskNameRef.current.value,
                taskDescription: taskDescriptionRef.current.value,
                UserTaskId: activeUser
            });
                                                        
        } catch (ex) {
            throw new Error(ex)
        };
        dispatch(addTask({ taskId: taskIdRef.current.value, taskTypeId: indexSelectOption, taskName: taskNameRef.current.value, taskDescription: taskDescriptionRef.current.value, UserTaskId: activeUser }))
        newNavigate('/taskList')

    }
    return (
        <>
            <br />
            <h2 style={{ color: "gray", fontStyle: "italic" }}>!?אולי תעשי זאת עכשיו</h2>
            <br></br>
            <br></br>
            <TextField
                id="standard-number"
                label="מספר משימה"
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="standard"
            />
            <br></br>
            <br></br>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">סוג משימה</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={TaskType}
                    onChange={handleChange}
                    label="סוג משימה"
                    inputRef={taskTypeIdRef}
                    style={{ width: 180 }}
                >
                    debugger;
                    {taskType.map(x => <MenuItem key={x.taskTypeId} value={x.taskTypeName}>{x.taskTypeName}</MenuItem>)}
                </Select>
            </FormControl>

            <br></br>
            <br></br>
            <TextField inputRef={taskNameRef} id="standard-basic" label="שם משימה" variant="standard" required />

            <br />
            <br></br>

            <TextField inputRef={taskDescriptionRef} id="standard-basic" label="תיאור משימה" variant="standard" />

            <br></br>
            <br></br>
            <Button onClick={addNewTask} style={{ color: "gray", borderColor: "gray" }} variant="outlined" startIcon={<AddIcon />}>
                הוספת משימה
            </Button>


        </>
    )
})

