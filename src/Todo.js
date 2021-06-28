import React, { useEffect, useState } from 'react';
import todologo from './images/todologo.png';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';


// to get the local items ot the list added earlier
const getLS=()=>
{
    let list =localStorage.getItem('todos');
    if(list)
    {
        return JSON.parse(localStorage.getItem('todos'));
    }
    else
    {
        return [];
    }
}


const Todo=()=>
{
    // To input a single task.
    const [task,setTask]=useState("");

    // List of Items in the TODO list.
    const [mytasks,setMytasks]=useState(getLS);

    // To change the ADD button to EDIT button when we choose to edit the task.
    const [btnChange,setBtnChagne]=useState(true);

    // For EDITING an existing task.
    const [editTask,setEditTask]=useState()

    // function to add a new task.
    const addnewTask=()=>
    {
        // To avoid adding a Null string/Task.
        if(!task)
        {
            setMytasks([...mytasks]);
        }

        // When the task is being edited
        else if(task && !btnChange)
        {
            setMytasks(
                mytasks.map((ele)=>{
                    if(ele.id===editTask)
                    {
                        return {...ele,name:task}
                    }
                    return ele;
                })
            );
            setBtnChagne(true);
        }

        //Adding a new task with a key as time at which it was edited.
        else
        {
            const uniqueTask={ id: new Date().getTime().toString(), name:task};
            setMytasks([...mytasks,uniqueTask]);
        }
        setTask("");
    };

    // Function to delete a task.
    const deleteTask=(id)=>
    {
        const updatedList=mytasks.filter((ele)=>
        {
            return ele.id!==id;
        })
        setMytasks(updatedList);
    }

    //Removing all the elements fron the list.
    const removeAll=()=>
    {
        setMytasks([]);
    };

    // Function for editing a Task.
    const edit=(idd)=>
    {
        let newTask=mytasks.find((ele)=>{
            return ele.id===idd;
        });
        setBtnChagne(false);
        setTask(newTask.name);
        setEditTask(idd);
    }

    // To ensure that changes in our TODO list are reflected in our local storage as well
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(mytasks));
    },[mytasks]);

    return(
        <>
            <div className="container">
                <div className="innerdiv">
                    <figure>
                        <img src={todologo} alt="here comes the logo" />
                        <figcaption>Add Your Tasks Here</figcaption>
                    </figure>

                    <div className="addtask">
                        <input type="text" 
                            placeholder="Add a New Task....." 
                            value={task}
                            onChange={(e)=>setTask(e.target.value)}
                        />
                        {
                            btnChange ? <button onClick={addnewTask} className="topbtn"> <AddIcon/> </button> :
                            <button onClick={addnewTask} className="topbtn"><EditIcon/></button>
                        }
                    </div>
                    <hr/>
                    <div className="alltasks">
                        {
                            mytasks.map((ele,i)=>{
                                return(
                                    <div className="eachtask" key={ele.id}>
                                        <h3>{ele.name}</h3>
                                        <div className="listbtn">
                                            <button onClick={()=>edit(ele.id)}><EditIcon/></button>
                                            <button onClick={()=>deleteTask(ele.id)}><DeleteIcon/></button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <hr/>
                    <div className="removeall">
                        <button onClick={removeAll}>Remove All</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;