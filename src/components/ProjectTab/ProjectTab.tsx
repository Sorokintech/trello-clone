import React, { FC } from "react";
import projectEditImage from "../../assets/images/project-edit-image.png";
import "./ProjectTab.scss";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { IProject } from "../../assets/types/types";

const ProjectTab: FC<IProject> = ({ ...props }) => {
  const navigate = useNavigate();
  const task = props.tasks;
  console.log(task);
  return (
    <div
      id={props.projectId}
      className={cn("project-tab")}
      onClick={() => navigate(`/project-page`)}
    >
      <img
        className={cn("project-tab__edit-image")}
        src={projectEditImage}
        alt="edit_image"
      />
      <h3 className={cn("project-tab__title")}>{props.title}</h3>
      <div className={cn("project-tab__content")}>
        <div className={cn("project-tab__content__item")}>
          В работе :{" "}
          <span>
            {props.tasks.filter((el) => el.category === "dev").length}
          </span>
        </div>
        <div className={cn("project-tab__content__item")}>
          В очереди:{" "}
          <span>
            {props.tasks.filter((el) => el.category === "queue").length}
          </span>
        </div>
        <div className={cn("project-tab__content__item")}>
          Выполнено :{" "}
          <span>
            {props.tasks.filter((el) => el.category === "done").length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTab;
