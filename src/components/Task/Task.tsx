import React, { FC, useState } from "react";

import cn from "classnames";
import "./Task.scss";
// import projectEditImage from "../../assets/images/project-edit-image.png";
import TaskModal from "../TaskModal/TaskModal";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../store";
import { ITask } from "../../assets/types/types";

const Task: FC<ITask> = ({ ...props }) => {
  const data = props;
  const [isModalOpen, setModalState] = useState(false);
  const ToggleModal = () => {
    setModalState(!isModalOpen);
  };
  const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(actionCreators.editTask(data))}>
      <div className={cn("task")} onClick={ToggleModal}>
        <div className={cn("task__number")}>#{props.task_number}</div>
        <h4 className={cn("task__title")}>{props.title}</h4>
        <div className={cn("task__priority")}>{props.priority}</div>
        <div className={cn("task__create-date")}>от {props.createDate}</div>
        <div className={cn("task__dev-time")}>В работе: {props.devTime}</div>

        <div className={cn("task__end-date")}>готово {props.endDate}</div>
        <div className={cn("task__status")}>{props.status}</div>
      </div>
      <TaskModal
        id={props.title}
        task_id={props.task_id}
        isOpen={isModalOpen}
        onClose={ToggleModal}
      />
    </div>
  );
};

export default Task;
