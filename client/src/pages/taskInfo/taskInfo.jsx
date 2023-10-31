import { useState } from "react";
import { useContext,useEffect } from "react";
import { useForm} from "react-hook-form";
import axios from "axios";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal";
import EditModal from "../../components/modalEdit";
import AddTaskModal from "../../components/addTaskModal";
import CategorySideComponent from "../../components/category";
import HeaderComponent from "../../components/header";
import Drawer from "../../components/drawer";
import { UserDataCtx } from "../../context/userData";
const TaskInfo = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(UserDataCtx);
  const params = useParams();
  const navigate=useNavigate();

  const [userInfo,setUserInfo]=useState({});
  const userId=localStorage.getItem('userId');
  const token =localStorage.getItem('token');
  const taskId=params.id;
  useEffect(() => {
    
    axios({
      method: 'get',
      url: `http://localhost:5000/users/${userId}`,
     
    })
      .then((response) => {
        console.log(response.data.tasks)
    setUserInfo((prev)=>response.data.tasks.find((e)=>e._id==taskId));
      })
      .catch((e) => alert(e));
      ()=>setUserInfo({})
  }, [userInfo]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

const onSubmit=(data)=>{
    user.editTask(props.id,data);
    toggleModal();
    toast.success("TASK UPDATED",{
      autoClose: 2000,
  position:"top-center"   });
}
  return (
    <>
    <HeaderComponent />

    {token ? (
      <div className="flex   w-screen h-[calc(100vh-3rem)]">
        <div className="w-1/5 hidden lg:flex">
          <CategorySideComponent />
        </div>

        <div>
          <Drawer />
        </div>

        <div className="bg-gradient-to-r shadow-lg from-blue-500 to-indigo-500 w-3/4 
        lg:w-1/2 mx-auto my-auto rounded-lg  pl-6  pt-5 h-3/4 justify-around flex flex-col gap-2">
  <div className="w-full flex justify-center">
  <h3 className=" text-white font-bold text-2xl">
            Task info

        </h3>

  </div>
    <div className="flex width-full text-white gap-4">
    <h4  className="font-bold text-lg uppercase w-1/6">
        name
      </h4>
      <p className="">:</p>

      <h5 className="font-thin text-xl">
      {userInfo?.name}
      </h5>
        </div>    
        <div className="flex width-full text-white gap-4">
    <h4  className="font-bold text-lg uppercase w-1/6">
        status 
      </h4>
      <p>:</p>

      <h5 className="font-thin text-xl">
      {userInfo?.status}
      </h5>
        </div>    
        <div className="flex width-full text-white gap-4">
    <h4  className="font-bold text-lg uppercase w-1/6">
        type 
      </h4>
      <p>:</p>
      <h5 className="font-thin text-xl">
      {userInfo?.type}
      </h5>
        </div>    
        <div className="flex width-full text-white gap-4">
    <h4  className="font-bold text-lg uppercase w-1/6">
        date
      </h4>
      <p>:</p>

      <h5 className="font-thin text-xl">
      {userInfo?.date}
      </h5>
        </div>    
        <div className="flex width-full text-white gap-4">
    <h4  className="font-bold text-lg uppercase w-1/6">
        notes 
      </h4>
      <p>:</p>

      <h5 className="font-thin text-xl">
      {userInfo?.note}
      </h5>
        </div>    
        <div className="flex width-full text-white gap-4 justify-between">
     <div className="flex justify-start">
     <button type="button" 
        className="text-white bg-gradient-to-r
         from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
         focus:ring-4 focus:outline-none focus:ring-blue-300
          dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5
           text-center mr-2 mb-2"
           onClick={()=>{navigate('/home')}}
           >Back</button>
     </div>
         <div className="flex w-1/2 justify-end gap-5 pr-5">
         <EditModal id={taskId}></EditModal>
           <Modal id={taskId}></Modal>
         </div>
        </div>    
     
   
        </div>
      </div>
    ) : (
      <div className="w-full h-full flex justify-center items-center text-4xl text-red-600">
        Please Login First
        {setTimeout(() => {
          navigate("/");
        }, 3000)}
      </div>
    )}
  </>
  );
};

export default TaskInfo;
