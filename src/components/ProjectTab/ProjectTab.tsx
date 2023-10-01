import React, { FC } from "react";
import projectEditImage from "../../assets/images/project-edit-image.png";
import "./ProjectTab.scss";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

interface IProjectTab {
  id: string;
  title: string;
  task_done: number;
  task_queue: number;
  task_dev: number;
}

const ProjectTab: FC<IProjectTab> = ({ ...props }) => {
  console.log(props);
  const navigate = useNavigate();
  return (
    <div
      id={props.id}
      className={cn("project-tab")}
      onClick={() => navigate(`/project-page`)}
      // onClick={() => navigate(`/project-page/${props.id}`)}
    >
      <img
        className={cn("project-tab__edit-image")}
        src={projectEditImage}
        alt="edit_image"
      />
      <h3 className={cn("project-tab__title")}>{props.title}</h3>
      <div className={cn("project-tab__content")}>
        <div className={cn("project-tab__content__item")}>
          В работе : <span>{props.task_dev}</span>
        </div>
        <div className={cn("project-tab__content__item")}>
          В очереди: <span>{props.task_queue}</span>
        </div>
        <div className={cn("project-tab__content__item")}>
          Выполнено : <span>{props.task_done}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectTab;
