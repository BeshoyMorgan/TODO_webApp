import { useNavigate } from "react-router-dom";
import { UserAuthCtx } from "../context/userAuth";
import { useContext } from "react";

const HeaderComponent = () => {
  const auth=useContext(UserAuthCtx);
  const name=localStorage.getItem("userName");
const navigate=useNavigate();
  const logout=()=>{
auth.logout();
navigate('/');

}
  return (
    <div
      className="flex justify-center lg:justify-between items-center
        text-white 
        bg-cyan-500 w-screen h-12 px-4"
    >
      <div className="flex-1 text-center hidden lg:flex">
      <h1 className="font-bold"> welcome {name}</h1>

      </div>
      <div className="flex-1 text-center">
            <h1 className="font-bold text-3xl">
                todo
            </h1>
        

      </div>
      <div className="flex-1 pt-2 text-center hidden lg:flex justify-end">
      <button type="button" class="text-white
       bg-cyan-500 border border-gray-300 focus:outline-none 
        focus:ring-gray-200 
        font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 "
        onClick={()=>{logout()}}>Log Out</button>

      </div>
    </div>
  );
};

export default HeaderComponent;
