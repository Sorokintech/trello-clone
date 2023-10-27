import React, { FC, useEffect, useState } from "react";

import cn from "classnames";
import "./Task.scss";
import { useSelector } from "react-redux";
import { State } from "../../store";
import EditTask from "../Modals/EditTask/EditTask";
import { useParams } from "react-router-dom";
import { DraggableProvided } from "react-beautiful-dnd";

const Task: FC<{
  task_id: string;
  category_id: string | undefined;
  provided: DraggableProvided;
  setDraggable: () => void;
}> = (props) => {
  const { project_id } = useParams();
  const category = useSelector(
    (state: State) =>
      state.projectData
        .filter((el) => el.project_id === project_id)[0]
        .categories.filter(
          (category) => category.category_id === props.category_id
        )[0]
  );
  // const lol = useSelector(
  //   (state: State) =>
  //     state.projectData
  //       .filter((el) => el.project_id === project_id)[0]
  //       .categories.filter(
  //         (category) => category.category_id === props.category_id
  //       )[0]
  // );
  // console.log(category);
  // console.log(category.tasks.filter((task) => task.task_id === props.task_id));
  const task = category.tasks.filter(
    (task) => task.task_id === props.task_id
  )[0];

  const [isModalOpen, setModalState] = useState(false);
  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isModalOpen) {
      return;
    }
  };
  const ToggleModal = () => {
    setModalState(!isModalOpen);
    props.setDraggable();
  };

  // useEffect(() => {
  //   console.log(task);
  // }, [task]);
  return (
    <div
      key={task?.task_id}
      {...props.provided.dragHandleProps}
      {...props.provided.draggableProps}
      ref={props.provided.innerRef}
    >
      <div
        className={cn("task")}
        onClick={ToggleModal}
        onMouseDown={handleDrag}
      >
        {/* <div className={cn("task__number")}>#{task.task_number} </div> */}
        <h4 className={cn("task__title")}>{task?.title}</h4>
        <div className={cn("task__priority")}>{task?.priority}</div>

        <div className={cn("task__status")}>{category?.title}</div>
      </div>
      <EditTask
        task_id={task?.task_id}
        category_id={task?.category_id}
        isOpen={isModalOpen}
        onClose={ToggleModal}
      />
    </div>
  );
};

export default Task;
