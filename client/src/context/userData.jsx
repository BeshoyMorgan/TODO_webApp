import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserDataCtx = createContext();

const UserDataProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const userId = localStorage.getItem("userId");
  const [tasksWithoutFilter, setTasksWithoutFilter] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios({
        method: "get",
        url: `http://localhost:5000/users/${userId}`,
      })
        .then((response) => {
          setTasks(response.data.tasks);
          setTasksWithoutFilter(response.data.tasks);
        })
        .catch((e) => alert("something wrong"));
    }
  }, [category]);

  const statusFilter = (status, type) => {
    setCategory(status);
    setType(type);
  };

  const typeFilter = (status, type) => {
    setType(type);
    setCategory(status);
  };

  const allTasks = () => {
    setCategory("");
    setType("");
  };

  const addTask = (data) => {
    if (localStorage.getItem("token")) {
      axios
        .post(`http://localhost:5000/users/${userId}`, {
          name: data?.taskName?.toString(),
          date: data?.date.toString(),
          note: data?.note?.toString(),
          status: data?.status?.toString(),
          type: data?.type?.toString(),
        })
        .then((response) => {
          console.log(response.data);
          setTasks((prevTasks) => [response.data, ...prevTasks]);
          setTasksWithoutFilter((prevTasks) => [response.data, ...prevTasks]);

        })
        .catch((e) => {
          console.error(e);
          alert("An error occurred while updating the task.");
        });
    }
  };

  const deleteTask = (taskId) => {
    if (localStorage.getItem("token")) {
      axios({
        method: "delete",
        url: `http://localhost:5000/users/${userId}`,
        data: {
          id: taskId.toString(),
        },
      })
        .then((response) => {
          console.log(response);
          setTasks(tasks.filter((task) => task._id !== taskId));
          setTasksWithoutFilter(tasks.filter((task) => task._id !== taskId));

        })
        .catch((e) => alert(e));
    }
  };

  const editTask = (taskId, data) => {
    if (localStorage.getItem("token")) {
      axios
        .patch(`http://localhost:5000/users/${userId}`, {
          id: taskId?.toString(),
          data: {
            name: data?.taskName?.toString(),
            date: "26/10/2023",
            note: data?.note?.toString(),
            status: data?.status?.toString(),
            type: data?.type?.toString(),
          },
        })
        .then((response) => {
          setTasks((prevTasks) =>
            prevTasks.map((task) => {
              if (task._id === taskId) {
                return {
                  ...task,
                  name: data?.taskName?.toString(),
                  date: "26/10/2023",
                  note: data?.note?.toString(),
                  status: data?.status?.toString(),
                  type: data?.type?.toString(),
                };
              }
              return task;
            })
          );
          setTasksWithoutFilter((prevTasks) =>
          prevTasks.map((task) => {
            if (task._id === taskId) {
              return {
                ...task,
                name: data?.taskName?.toString(),
                date: "26/10/2023",
                note: data?.note?.toString(),
                status: data?.status?.toString(),
                type: data?.type?.toString(),
              };
            }
            return task;
          })
        );
        })
        .catch((e) => {
          console.error(e);
          alert("An error occurred while updating the task.");
        });
    }
  };


  const filteredTasks =
    tasks && tasks.length > 0
      ? tasks.filter((task) => {
          if (category && type) {
            return task.status === category && task.type === type;
          } else if (category) {
            return task.status === category;
          } else if (type) {
            return task.type === type;
          } else {
          
            return true;
          }
        })
      : [];

  return (
    <UserDataCtx.Provider
      value={{
        allTasks,
        category,
        type,
        addTask,
        statusFilter,
        typeFilter,
        deleteTask,
        editTask,
        tasksWithoutFilter,
        tasks: filteredTasks,
      }}
    >
      {props.children}
    </UserDataCtx.Provider>
  );
};

export default UserDataProvider;
