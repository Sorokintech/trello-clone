import React, { FC, useState } from "react";
import cn from "classnames";
import "./TaskColumn.scss";
import Task from "../Task/Task";
import { useSelector } from "react-redux";
import { actionCreators, State } from "../../store";
import Button from "../Inputs/Button/Button";
import NewTaskModal from "../TaskModal/NewTaskModal/NewTaskModal";

interface ITaskColumn {
  title: string;
  id: string;
}

const TaskColumn: FC<ITaskColumn> = ({ title, id }) => {
  const state = useSelector((state: State) => state.projectData[1]);
  console.log(state);
  const ColumnTasks = state.tasks.filter((el) => el.category === id);
  const [column, updateColumn] = useState(ColumnTasks);
  const [isModalOpen, setModalState] = useState(false);
  const ToggleModal = () => {
    setModalState(!isModalOpen);
  };
  function addTask() {
    console.log("task has been added");
  }
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
