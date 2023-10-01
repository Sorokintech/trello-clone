import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import ProjectPage from "./pages/ProjectPage/ProjectPage";

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      {/* <Route path="/project-page/project_id" element={<ProjectPage />} /> */}
      <Route path="/project-page" element={<ProjectPage />} />
    </Routes>
  );
};
export default AppRoutes;
