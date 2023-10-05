import React, { FC } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import Header from "../../components/Header/Header";

import "./ProjectPage.scss";
import TaskColumn from "../../components/TaskColumn/TaskColumn";

const ProjectPage: FC = () => {
  const { project_id } = useParams();
  // console.log(project_id);
  return (
    <div className={cn("project-page")}>
      <Header />
      <div className={cn("project-page__task-container")}>
        <TaskColumn title={"В очереди"} id={"queue"} />
        <TaskColumn title={"В работе"} id={"dev"} />
        <TaskColumn title={"Выполнено"} id={"done"} />
      </div>
    </div>
  );
};

export default ProjectPage;
