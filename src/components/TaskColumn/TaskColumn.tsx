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
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

const TaskColumn: FC<ITaskColumn> = ({ title, id }) => {
  const { project_id } = useParams();
  const tasks = useSelector((state: State) =>
    state.projectData
      .filter((el) => el.project_id === project_id)[0]
      .tasks.filter((el) => el.category === id)
  );
  //
  // const [columns, updateColumns] = useState(ColumnTasks);
  const [isModalOpen, setModalState] = useState(false);
  const ToggleModal = () => {
    setModalState(!isModalOpen);
  };
  // useEffect(() => {
  //   console.log(ColumnTasks);
  // }, [ColumnTasks]);

  const onDragEnd = (
    result: DropResult
    // , columns, setColumns
  ) => {
    // if (!result.destination) return;
    // const { source, destination } = result;
    console.log(result);

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = columns[source.droppableId];
    //   const destColumn = columns[destination.droppableId];
    //   const sourceItems = [...sourceColumn.items];
    //   const destItems = [...destColumn.items];
    //   const [removed] = sourceItems.splice(source.index, 1);
    //   destItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       items: sourceItems,
    //     },
    //     [destination.droppableId]: {
    //       ...destColumn,
    //       items: destItems,
    //     },
    //   });
    // } else {
    //   const column = columns[source.droppableId];
    //   const copiedItems = [...column.items];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems,
    //     },
    //   });
    // }
  };
  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      <Droppable droppableId={id} key={id}>
        {(provided, snapshot) => (
          <div
            className={cn("task-column")}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h4 className={cn("task-column__header")}>{title}</h4>
            <div className={cn("task-column__content")}>
              {tasks.map((i, index) => (
                <Draggable
                  key={i.task_id}
                  draggableId={i.task_id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <Task
                      key={i.title}
                      task_id={i.task_id}
                      provided={provided}
                      //?  ^
                      // {...provided.draggableProps}
                      // {...provided.dragHandleProps}
                      // ref={provided.innerRef}
                    />
                  )}
                </Draggable>
              ))}
              {title === "В очереди" && (
                <Button title={"+ Добавить задачу"} click={ToggleModal} />
              )}
              <CreateTask isOpen={isModalOpen} onClose={ToggleModal} />
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskColumn;
