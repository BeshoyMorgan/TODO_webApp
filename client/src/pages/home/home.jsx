// hooks
import { useContext, useEffect } from "react";
///
import { useNavigate } from "react-router-dom";

// components
import Modal from "../../components/modal";
import EditModal from "../../components/modalEdit";
import AddTaskModal from "../../components/addTaskModal";
import CategorySideComponent from "../../components/category";
import HeaderComponent from "../../components/header";
import CardComponent from "../../components/card";
import Drawer from "../../components/drawer";
//  context
import { UserDataCtx } from "../../context/userData";

const HomePage = () => {
  const user = useContext(UserDataCtx);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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

          <div className="w-full lg:w-4/5 pt-5 flex flex-col gap-2">
            <div className="  flex justify-around h-1/6">
              <CardComponent name={"complete"} />
              <CardComponent name={"active"} />
              <CardComponent name={"helth"} />
              <CardComponent name={"learning"} />
              <CardComponent name={"personal"} />
            </div>
            <div className=" shadow-md sm:rounded-lg ">
              <h3 className="text-gray-400 text-xl pl-5 pb-2 uppercase">
                ALL
                {user.category ? <span className=""> &gt; </span> : ""}
                {user.category ? user.category : ""}
                {user.type ? <span className=""> &gt; </span> : ""}
                {user.type ? user.type : ""}
              </h3>
              <div
                className="relative 
      overflow-x-auto  max-h-80 overflow-y-scroll
      shadow-md sm:rounded-lg px-8"
              >
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Task Name
                      </th>
                      <th scope="col" className="px-6 py-3 hidden lg:flex">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {user.tasks != null
                      ? user?.tasks?.map((task) => {
                          return (
                            <tr
                              key={task._id}
                              className={
                                task.status == "complete"
                                  ? "border-b hover:bg-green-400 bg-green-200"
                                  : "bg-white border-b hover:bg-gray-50 "
                              }
                            >
                              <th
                                scope="row"
                                className="cursor-pointer px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                onClick={() => {
                                  navigate(`/task/${task._id}`);
                                }}
                              >
                                {task.name}
                              </th>
                              <td className="px-6 hidden pt-7 lg:flex">
                                {task.date}
                              </td>
                              <td className="px-6 py-4">{task.status}</td>
                              <td className="px-6 py-4">
                                <EditModal id={task._id} />
                              </td>
                              <td className="px-6 py-4 text-right">
                                <Modal id={task._id} />
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <AddTaskModal />
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
export default HomePage;
