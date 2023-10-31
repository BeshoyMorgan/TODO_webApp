import { render, act } from '@testing-library/react';
import { UserAuthCtx } from './UserAuthContext';
import { useContext } from 'react';

describe('UserAuthProvider', () => {
  afterEach(() => {
    localStorage.clear();
  });

  test('login should set user authentication data in local storage', () => {
    const token = 'exampleToken';
    const userId = 'exampleUserId';
    const userName = 'exampleUserName';

    const TestComponent = () => {
      const userAuthData = useContext(UserAuthCtx);
      const { login } = userAuthData;

      const handleClick = () => {
        login(token, userId, userName);
      };

      return <button onClick={handleClick}>Login</button>;
    };

    const { getByText } = render(
      <UserAuthCtx.Provider value={{ login: jest.fn() }}>
        <TestComponent />
      </UserAuthCtx.Provider>
    );

    act(() => {
      getByText('Login').click();
    });

    expect(localStorage.getItem('token')).toBe(token);
    expect(localStorage.getItem('userId')).toBe(userId);
    expect(localStorage.getItem('userName')).toBe(userName);
  });

  test('logout should remove user authentication data from local storage', () => {
    localStorage.setItem('token', 'exampleToken');
    localStorage.setItem('userId', 'exampleUserId');
    localStorage.setItem('userName', 'exampleUserName');

    const TestComponent = () => {
      const userAuthData = useContext(UserAuthCtx);
      const { logout } = userAuthData;

      const handleClick = () => {
        logout();
      };

      return <button onClick={handleClick}>Logout</button>;
    };

    const { getByText } = render(
      <UserAuthCtx.Provider value={{ logout: jest.fn() }}>
        <TestComponent />
      </UserAuthCtx.Provider>
    );

    act(() => {
      getByText('Logout').click();
    });

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('userId')).toBeNull();
    expect(localStorage.getItem('userName')).toBeNull();
  });


});