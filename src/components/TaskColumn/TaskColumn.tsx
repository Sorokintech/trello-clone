import React, { FC, useState } from "react";
import cn from "classnames";
import "./TaskColumn.scss";
import Task from "../Task/Task";
import { useSelector } from "react-redux";
import { actionCreators, State } from "../../store";
import Button from "../Inputs/Button/Button";
import NewTaskModal from "../TaskModal/NewTaskModal/NewTaskModal";
import { useParams } from "react-router-dom";
import { IProject } from "../../assets/types/types";

interface ITaskColumn {
  title: string;
  id: string;
}

const TaskColumn: FC<ITaskColumn> = ({ title, id }) => {
  const { project_id } = useParams();
  console.log(project_id);
  const state = useSelector((state: State) => state.projectData);

  const ColumnTasks = state
    .filter((el) => el.projectId === project_id)[0]
    .tasks.filter((el) => el.category === id);
  const [column, updateColumn] = useState(ColumnTasks);
  const [isModalOpen, setModalState] = useState(false);
  const ToggleModal = () => {
    setModalState(!isModalOpen);
  };
  // function addTask() {
  //   console.log("task has been added");
  // }
  return (
    <div className={cn("task-column")}>
      <h4 className={cn("task-column__header")}>{title}</h4>
      <div className={cn("task-column__content")}>
        {column.map((i) => (
          <Task {...i} />
        ))}
        {title === "В очереди" && (
          <Button
            title={"+ Добавить задачу"}
            className={"button-light-blue"}
            click={ToggleModal}
          />
        )}
        <NewTaskModal isOpen={isModalOpen} onClose={ToggleModal} />
      </div>
    </div>
  );
};

export default TaskColumn;
