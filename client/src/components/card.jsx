import { useContext, useEffect, useState } from "react";
import { UserDataCtx } from "../context/userData";

const CardComponent = (props) => {
    const user=useContext(UserDataCtx);
    const [count,setCount]=useState(0);
    const [type,setType]=useState(false);
useEffect(()=>{

    if(props.name=="complete"||props.name=="active"){
        const filteredTasks = user.tasksWithoutFilter.filter(task => task.status === props.name);
        setCount(filteredTasks.length);
    setType(false)
    }
     else if(props.name=="personal"||props.name=="learning"||props.name=="helth"){
        const filteredTasks = user.tasksWithoutFilter.filter(task => task.type === props.name);
        setCount(filteredTasks.length);
    setType(true)
    }
    else{
        setCount(user.tasks.length);
    }
    
},[user.tasks])
    return ( 
   
    <div 
    onClick={()=>
        {  
            type?user.statusFilter(user.category,props.name):
            user.statusFilter(props.name,user.type)
        }}
    className={`w-1/6 
    ${user.category==props.name?"bg-gradient-to-r from-purple-500 to-pink-500":"bg-gradient-to-r from-blue-500 to-indigo-500"}
    ${user.type==props.name?"bg-gradient-to-r from-purple-500 to-pink-500":
    "bg-gradient-to-r from-blue-500 to-indigo-500"}
    
    border border-blue-400 rounded p-4  shadow-lg`}>
    <div className="w-full block justify-around">
      <h3 className="text-white uppercase">{props.name}</h3>
      <p className="text-3xl font-bold text-white">{count}</p>
    </div>
  </div>
  
     );
}
 
export default CardComponent;