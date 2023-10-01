import React, { FC } from "react";

import Header from "../../components/Header/Header";
import ProjectTab from "../../components/ProjectTab/ProjectTab";
import "./MainPage.scss";

const MockProjects = [
  {
    id: "1",
    title: "Project Alpha",
    task_done: 2,
    task_queue: 1,
    task_dev: 1,
  },
  {
    id: "2",
    title: "Project Beta",
    task_done: 1,
    task_queue: 1,
    task_dev: 3,
  },
  {
    id: "3",
    title: "Project Gamma",
    task_done: 2,
    task_queue: 2,
    task_dev: 1,
  },
];

const MainPage: FC = () => {
  return (
    <div className="main-page">
      <Header />
      <div className="main-page__project-container">
        {MockProjects.map((p) => (
          <ProjectTab {...p} />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
