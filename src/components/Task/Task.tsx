import React, { FC } from "react";

import cn from "classnames";
import "./Task.scss";
import projectEditImage from "../../assets/images/project-edit-image.png";

interface ITask {
  category: string;
  task_id: string;
  task_number: string;
  title: string;
  priority: string;
  createDate: string;
  devTime: string;
  endDate: string;
  status: string;
  innerRef?: (element: HTMLElement | null) => void;
}
const Task: FC<ITask> = ({ ...props }) => {
  return (
    <div className={cn("task")}>
      {/* <img
        className={cn("task__edit-image")}
        src={projectEditImage}
        alt="edit_image"
      /> */}
      <div className={cn("task__number")}>#{props.task_number}</div>
      <h4 className={cn("task__title")}>{props.title}</h4>
      <div className={cn("task__priority")}>{props.priority}</div>
      <div className={cn("task__create-date")}>от {props.createDate}</div>
      <div className={cn("task__dev-time")}>В работе: {props.devTime}</div>

      <div className={cn("task__end-date")}>готово {props.endDate}</div>
      <div className={cn("task__status")}>{props.status}</div>
    </div>
  );
};

export default Task;
