import { UserDataCtx } from "../context/userData";
import { useContext } from "react";
import { UserAuthCtx } from "../context/userAuth";
import { useNavigate } from "react-router-dom";
const CategorySideComponent = () => {
  const user=useContext(UserDataCtx);
  const auth=useContext(UserAuthCtx);
  const navigate=useNavigate();
  const logout=()=>{
    auth.logout();
    navigate('/');
    
    }
  return (
    <div className=" h-full w-full flex flex-col gap-5 border-r
     border-gray-300 bg-gradient-to-b from-blue-400 to-cyan-500 text-white">
    <div className="text-start pt-2 pl-7">
      <h1
        onClick={() => { user.allTasks() }}
        className=" hover:cursor-pointer hover:underline"
      >
        All
      </h1>
    </div>
    <div className="w-full flex flex-col gap-2 text-start pl-7">
      <h1 className="font-bold text-2xl">Status</h1>
      <div className="w-full flex flex-col gap-1">
        <h1
          onClick={() => { user.statusFilter("active","") }}
          className=" hover:cursor-pointer hover:underline"
        >
          Active
        </h1>
        <h1
          onClick={() => { user.statusFilter("complete","") }}
          className=" hover:cursor-pointer hover:underline"
        >
          Complete
        </h1>
      </div>
    </div>
    <div className="w-full flex flex-col gap-2 text-start pl-7">
      <h1 className="font-bold text-2xl">Type</h1>
      <div className="w-full flex flex-col gap-1">
        <h1
          onClick={() => { user.typeFilter("","personal") }}
          className="hover:cursor-pointer hover:underline"
        >
          Personal
        </h1>
        <h1
          onClick={() => { user.typeFilter("","learning") }}
          className=" hover:cursor-pointer hover:underline"
        >
          Learning
        </h1>
        <h1
          onClick={() => { user.typeFilter("","helth") }}
          className=" hover:cursor-pointer hover:underline"
        >
          Health
        </h1>
      </div>
    </div>
    <div className=" w-full flex flex-col gap-2 text-start pl-7 pt-10">
    <h1
          onClick={()=>{logout()}}
          className="lg:hidden hover:cursor-pointer hover:underline"
        >
          Log Out
        </h1>
    </div>
    


  </div>
  
  )

};

export default CategorySideComponent;
