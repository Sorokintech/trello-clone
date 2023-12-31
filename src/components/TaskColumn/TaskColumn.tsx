import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import { Draggable, DroppableProvided } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Task from "../Task/Task";
import { State } from "../../store";
import Button from "../Inputs/Button/Button";
import CreateTask from "../Modals/CreateTask/CreateTask";

import "./TaskColumn.scss";

const TaskColumn: FC<{
  title: string;
  category_id: string | undefined;
  provided: DroppableProvided;
}> = (props) => {
  const { project_id } = useParams();
  const tasks = useSelector(
    (state: State) =>
      state.projectData
        .filter((el) => el.project_id === project_id)[0]
        .categories.filter(
          (category) => category.category_id === props.category_id
        )[0].tasks
  );
  const searchValue = useSelector((state: State) => state.searchValue);

  const [isModalOpen, setModalState] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const handleDraggableChange = () => {
    setIsDraggable(!isDraggable);
  };
  const ToggleModal = () => {
    setModalState(!isModalOpen);
  };
  useEffect(() => {
    console.log(tasks);
  }, [tasks]);
  return (
    <div
      className={cn("task-column")}
      {...props.provided.droppableProps}
      ref={props.provided.innerRef}
    >
      <h4 className={cn("task-column__header")}>{props.title}</h4>
      <div className={cn("task-column__content")}>
        {tasks
          ?.filter(
            (i) =>
              i.title
                .toLocaleLowerCase()
                .indexOf(searchValue.toLocaleLowerCase()) !== -1
          )
          .map((i, index) => (
            <Draggable
              key={i.task_id}
              draggableId={i.task_id}
              index={index}
              isDragDisabled={isDraggable}
            >
              {(provided, snapshot) => (
                <Task
                  key={i.title}
                  task_id={i.task_id}
                  category_id={i.category_id}
                  provided={provided}
                  setDraggable={handleDraggableChange}
                />
              )}
            </Draggable>
          ))}
        {props.category_id === "queue" && (
          <Button title={"+ Добавить задачу"} click={ToggleModal} />
        )}
        <CreateTask
          isOpen={isModalOpen}
          onClose={ToggleModal}
          category_id={props.category_id}
        />
      </div>
      {props.provided.placeholder}
    </div>
  );
};

export default TaskColumn;
