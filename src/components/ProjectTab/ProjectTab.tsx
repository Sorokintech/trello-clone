import React, { FC } from "react";
import projectEditImage from "../../assets/images/project-edit-image.png";
import "./ProjectTab.scss";
import cn from "classnames";

import { useNavigate } from "react-router-dom";
import { IProject } from "../../assets/types/types";

const ProjectTab: FC<IProject> = ({ ...props }) => {
  const navigate = useNavigate();
  const category = props.categories;
  return (
    <div
      id={props.project_id}
      className={cn("project-tab")}
      onClick={() => navigate(`/project-page/${props.project_id}`)}
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
          <span>{category.filter((el) => el.title === "dev").length}</span>
        </div>
        <div className={cn("project-tab__content__item")}>
          В очереди:{" "}
          <span>{category.filter((el) => el.title === "queue").length}</span>
        </div>
        <div className={cn("project-tab__content__item")}>
          Выполнено :{" "}
          <span>{category.filter((el) => el.title === "done").length}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTab;
