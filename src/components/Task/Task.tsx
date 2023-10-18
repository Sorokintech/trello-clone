import React, { FC, useState } from "react";

import cn from "classnames";
import "./Task.scss";
import { useSelector } from "react-redux";
import { State } from "../../store";
import EditTask from "../Modals/EditTask/EditTask";
import { useParams } from "react-router-dom";
import { DraggableProvided } from "react-beautiful-dnd";
// export type TaskRef = HTMLDivElement;

const Task: FC<{ task_id: string; provided: DraggableProvided }> =
  //                                ^?
  (props) => {
    //^?
    const { project_id } = useParams();
    const task = useSelector(
      (state: State) =>
        state.projectData
          .filter((el) => el.project_id === project_id)[0]
          .tasks.filter((task) => task.task_id === props.task_id)[0]
    );
    const [isModalOpen, setModalState] = useState(false);
    const ToggleModal = () => {
      setModalState(!isModalOpen);
    };
    return (
      <div
        key={task.task_id}
        // ref={ref}
        {...props.provided.dragHandleProps}
        {...props.provided.draggableProps}
        ref={props.provided.innerRef}
      >
        <div className={cn("task")} onClick={ToggleModal}>
          <div className={cn("task__number")}>#{task.task_number}</div>
          <h4 className={cn("task__title")}>{task.title}</h4>
          <div className={cn("task__priority")}>{task.priority}</div>
          <div className={cn("task__create-date")}>от {task.createDate}</div>
          <div className={cn("task__dev-time")}>
            В работе: {task.devStartTime}
          </div>

          <div className={cn("task__end-date")}>готово {task.endDate}</div>
          <div className={cn("task__status")}>{task.status}</div>
        </div>
        <EditTask
          task_id={task.task_id}
          isOpen={isModalOpen}
          onClose={ToggleModal}
        />
      </div>
    );
  };

export default Task;
