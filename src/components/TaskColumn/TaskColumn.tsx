import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import "./TaskColumn.scss";
import Task from "../Task/Task";
import { useSelector } from "react-redux";
import { actionCreators, State } from "../../store";
import Button from "../Inputs/Button/Button";
import { useParams } from "react-router-dom";
import { IProject, ITaskColumn } from "../../assets/types/types";
import CreateTask from "../Modals/CreateTask/CreateTask";

const TaskColumn: FC<ITaskColumn> = ({ title, id }) => {
  const { project_id } = useParams();
  const state = useSelector((state: State) => state.projectData);

  const ColumnTasks = state
    .filter((el) => el.project_id === project_id)[0]
    .tasks.filter((el) => el.category === id);
  // const [column, updateColumn] = useState(ColumnTasks);
  const [isModalOpen, setModalState] = useState(false);
  const ToggleModal = () => {
    setModalState(!isModalOpen);
  };
  // useEffect(() => {
  //   console.log(ColumnTasks);
  // }, [ColumnTasks]);
  return (
    <div className={cn("task-column")}>
      <h4 className={cn("task-column__header")}>{title}</h4>
      <div className={cn("task-column__content")}>
        {ColumnTasks.map((i) => (
          <Task key={i.title} {...i} />
        ))}
        {title === "В очереди" && (
          <Button
            title={"+ Добавить задачу"}
            className={"button-light-blue"}
            click={ToggleModal}
          />
        )}
        <CreateTask isOpen={isModalOpen} onClose={ToggleModal} />
      </div>
    </div>
  );
};

export default TaskColumn;
