import { useState } from "react";
import { useContext,useEffect } from "react";
import { UserDataCtx } from "../context/userData";
import { useForm} from "react-hook-form";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserAuthCtx } from "../context/userAuth";

const AddTaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(UserDataCtx);
  const auth=useContext(UserAuthCtx);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

const onSubmit=(data)=>{
   user.addTask(data);

   toggleModal();
   toast.success("TASK ADDED",{
    autoClose: 2000,
position:"top-center"   });
}

  return (
    <>
      <button type="button" className="text-white bg-gradient-to-r absolute bottom-0
           from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br 
           focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg 
           text-sm px-5 py-2.5 text-center mr-2 mb-2 w-1/3"
           onClick={toggleModal}>Add Task</button>

{isOpen && (
        <div
          className="fixed top-0 left-0 right-0 bottom-0 flex items-center
        w-screen  justify-center z-50"
        >
       <form onSubmit={handleSubmit(onSubmit)}>
       <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-full flex gap-4 py-5 flex-col ">
              <input
                type="text"
                name=""
                id=""
                placeholder="Task Name"
                className="w-full py-sm rounded
     border-gray-400 focus:border-gray-400"
     {...register("taskName", {
        required: "Task Name is required",
      })}
      required          />
              <input
                type="date"
                name=""
                id=""
                className="rounded
     border-gray-400 focus:border-gray-400"
     {...register("date")}
            required  />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl text-gray-500">Status</h1>
                <div className="flex justify-around gap-4">
                  <div className="flex items-center mb-4">
                    <input
                     {...register("status")}
                      id="active"
                      type="radio"
                      name="status"
                      value="active"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 
    :border-gray-600"
    checked

                    />
                    <label
                      htmlFor="active"
                      className="block ml-2 text-sm 
    font-medium text-gray-900"
                    >
                      Active
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                     {...register("status")}
                      id="complete"
                      type="radio"
                      name="status"
                      value="complete"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 
    :border-gray-600"

                    />
                    <label
                      htmlFor="complete"
                      className="block ml-2 text-sm 
    font-medium text-gray-900"
                    >
                      Complete
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl text-gray-500">Type</h1>
                <div className="flex justify-around gap-4">
                  <div className="flex items-center mb-4">
                    <input
                                         {...register("type")}

                      id="personal"
                      type="radio"
                      name="type"
                      value="personal"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 
    :border-gray-600"
checked
                    />
                    <label
                      htmlFor="personal"
                      className="block ml-2 text-sm 
    font-medium text-gray-900"
                    >
                      Personal
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      {...register("type")}
                      id="learning"
                      type="radio"
                      name="type"
                      value="learning"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 
    :border-gray-600"
                    />
                    <label
                      htmlFor="learning"
                      className="block ml-2 text-sm 
    font-medium text-gray-900"
                    >
                      Learning
                    </label>
                  </div>
                  <div className="flex items-center mb-4">
                    <input
                      {...register("type")}
                      id="helth"
                      type="radio"
                      name="type"
                      value="helth"
                      className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 
    :border-gray-600"

                    />
                    <label
                      htmlFor="helth"
                      className="block ml-2 text-sm 
    font-medium text-gray-900"
                    >
                      Helth
                    </label>
                 
                  </div>
                </div>
              </div>
              <div style={{width:"400px"}}>
                        <input
                                              {...register("note")}

                        type="text" placeholder="Notes" className="w-full rounded border-gray-400" required/>
                    </div>
            </div>
            <button
              className="text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
              onClick={toggleModal}
            >
              Close
            </button>
            <button
              className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
              type="submit"
            >
              Save
            </button>
          </div>
       </form>
        </div>
      )}
    </>
  );
};

export default AddTaskModal;
