import { useState } from 'react';
import { useContext } from 'react';
import { UserDataCtx } from '../context/userData';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Modal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useContext(UserDataCtx);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
const deleteTask=()=>{
  user.deleteTask(
   
    props.id
  );
  toggleModal();
  toast.success("TASK DELETED",{
    autoClose: 2000,
position:"top-center"   });
}
  return (
    <div>
      <button
        className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={toggleModal}
      >
            Delete
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="text-gray-600 mb-4">Are You Sure You Want To <span className='text-red-600'>Delete </span>  This Task ?</p>
            <button
              className="text-white bg-gray-600 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
              onClick={toggleModal}
            >
              Close
            </button>
            <button
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
              onClick={() => {
               deleteTask()
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
