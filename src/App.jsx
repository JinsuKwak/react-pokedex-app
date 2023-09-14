import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <React.Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <Outlet />
    </React.Fragment>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/pokemon/:id" element={<DetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
