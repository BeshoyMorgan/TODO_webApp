import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/login/login";
import "./App.css";
import SignupPage from "./pages/signup/signup";
import HomePage from "./pages/home/home";
import TaskInfo from "./pages/taskInfo/taskInfo";
import NotFoundPage from "./pages/notFound/notFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/task/:id" element={<TaskInfo/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
