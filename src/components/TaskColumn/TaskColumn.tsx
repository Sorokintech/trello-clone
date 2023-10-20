import React, { FC, useEffect, useState } from "react";
import cn from "classnames";
import "./TaskColumn.scss";
import Task from "../Task/Task";
import { Provider, useSelector } from "react-redux";
import { actionCreators, State } from "../../store";
import Button from "../Inputs/Button/Button";
import { useParams } from "react-router-dom";
import { IProject, ITaskColumn } from "../../assets/types/types";
import CreateTask from "../Modals/CreateTask/CreateTask";
import {} from "react-beautiful-dnd";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

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
  //
  const [isModalOpen, setModalState] = useState(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const handleDraggableChange = () => {
    setIsDraggable(!isDraggable);
  };
  const ToggleModal = () => {
    setModalState(!isModalOpen);
  };
  // useEffect(() => {
  //   console.log(isDraggable);
  // }, [isDraggable]);
  return (
    <div
      className={cn("task-column")}
      {...props.provided.droppableProps}
      ref={props.provided.innerRef}
    >
      <h4 className={cn("task-column__header")}>{props.title}</h4>
      <div className={cn("task-column__content")}>
        {tasks.map((i, index) => (
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
    </div>
  );
};

export default TaskColumn;
