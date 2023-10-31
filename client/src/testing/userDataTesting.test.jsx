import { render, act } from '@testing-library/react';
import { UserDataCtx } from './UserDataContext';
import { useContext } from 'react';
import axios from 'axios';

jest.mock('axios');

describe('UserDataContext', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('addTask should add a new task', async () => {
    const taskId = '123';
    const taskData = {
      taskName: 'Task 1',
      date: '2023-10-31',
      note: 'Some notes',
      status: 'In Progress',
      type: 'Personal',
    };
    const response = {
      data: {
        _id: taskId,
        ...taskData,
      },
    };

    axios.post.mockResolvedValueOnce(response);

    const TestComponent = () => {
      const userData = useContext(UserDataCtx);
      const { addTask } = userData;

      const handleClick = () => {
        addTask(taskData);
      };

      return <button onClick={handleClick}>Add Task</button>;
    };

    const { getByText } = render(
      <UserDataCtx.Provider value={{ addTask: jest.fn() }}>
        <TestComponent />
      </UserDataCtx.Provider>
    );

    await act(async () => {
      getByText('Add Task').click();
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `http://localhost:5000/users/${localStorage.getItem('userId')}`,
      {
        name: taskData.taskName,
        date: taskData.date,
        note: taskData.note,
        status: taskData.status,
        type: taskData.type,
      }
    );
  });

  test('deleteTask should delete a task', async () => {
    const taskId = '123';

    axios.delete.mockResolvedValueOnce({});

    const TestComponent = () => {
      const userData = useContext(UserDataCtx);
      const { deleteTask } = userData;

      const handleClick = () => {
        deleteTask(taskId);
      };

      return <button onClick={handleClick}>Delete Task</button>;
    };

    const { getByText } = render(
      <UserDataCtx.Provider value={{ deleteTask: jest.fn() }}>
        <TestComponent />
      </UserDataCtx.Provider>
    );

    await act(async () => {
      getByText('Delete Task').click();
    });

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:5000/users/${localStorage.getItem('userId')}`,
      {
        data: {
          id: taskId,
        },
      }
    );
  });
  test('statusFilter should update the category and type state', async () => {
    const status = 'In Progress';
    const type = 'Personal';
  
    const TestComponent = () => {
      const userData = useContext(UserDataCtx);
      const { statusFilter } = userData;
  
      useEffect(() => {
        statusFilter(status, type);
      }, []);
  
      return null;
    };
  
    render(
      <UserDataCtx.Provider value={{ statusFilter: jest.fn() }}>
        <TestComponent />
      </UserDataCtx.Provider>
    );
  
    expect(statusFilter).toHaveBeenCalledTimes(1);
    expect(statusFilter).toHaveBeenCalledWith(status, type);
  });
  test('typeFilter should update the type and category state', async () => {
    const status = 'In Progress';
    const type = 'Personal';
  
    const TestComponent = () => {
      const userData = useContext(UserDataCtx);
      const { typeFilter } = userData;
  
      useEffect(() => {
        typeFilter(status, type);
      }, []);
  
      return null;
    };
  
    render(
      <UserDataCtx.Provider value={{ typeFilter: jest.fn() }}>
        <TestComponent />
      </UserDataCtx.Provider>
    );
  
    expect(typeFilter).toHaveBeenCalledTimes(1);
    expect(typeFilter).toHaveBeenCalledWith(status, type);
  });
  test('allTasks should reset the category and type state', async () => {
    const TestComponent = () => {
      const userData = useContext(UserDataCtx);
      const { allTasks } = userData;
  
      useEffect(() => {
        allTasks();
      }, []);
  
      return null;
    };
  
    render(
      <UserDataCtx.Provider value={{ allTasks: jest.fn() }}>
        <TestComponent />
      </UserDataCtx.Provider>
    );
  
    expect(allTasks).toHaveBeenCalledTimes(1);
    expect(allTasks).toHaveBeenCalledWith();
  });
  test('editTask should update the task with the given taskId and data', async () => {
    const taskId = '123';
    const taskData = {
      taskName: 'Task 1',
      date: '2023-10-31',
      note: 'Some notes',
      status: 'In Progress',
      type: 'Personal',
    };
    const response = {
      data: {
        _id: taskId,
        ...taskData,
      },
    };
  
    axios.patch.mockResolvedValueOnce(response);
  
    const TestComponent = () => {
      const userData = useContext(UserDataCtx);
      const { editTask } = userData;
  
      useEffect(() => {
        editTask(taskId, taskData);
      }, []);
  
      return null;
    };
  
    render(
      <UserDataCtx.Provider value={{ editTask: jest.fn() }}>
        <TestComponent />
      </UserDataCtx.Provider>
    );
  
    expect(axios.patch).toHaveBeenCalledTimes(1);
    expect(axios.patch).toHaveBeenCalledWith(
      `http://localhost:5000/users/${localStorage.getItem('userId')}`,
      {
        id: taskId,
        data: {
          name: taskData.taskName,
          date: '26/10/2023',
          note: taskData.note,
          status: taskData.status,
          type: taskData.type,
        },
      }
    );
  });


});