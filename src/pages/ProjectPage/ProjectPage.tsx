import React, { FC } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import Header from "../../components/Header/Header";
import { actionCreators, State } from "../../store";
import "./ProjectPage.scss";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";

const ProjectPage: FC = () => {
  const { project_id } = useParams();
  const onDragEnd = (result: DropResult) => {
    console.log(result);
  };
  const columns = [
    {
      column_1: "queue",
      column_2: "dev",
      column_3: "done",
    },
  ];
  // const tasks = useSelector((state: State) =>
  //   state.projectData
  //     .filter((el) => el.project_id === project_id)[0]
  //     .tasks.filter((el) => el.category === id)
  // );
  // console.log(project_id);
  return (
    <div className={cn("project-page")}>
      <Header />
      {/* <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <Droppable droppableId={id} key={id}>
          {(provided, snapshot) => ( */}
      <div className={cn("project-page__task-container")}>
        {/* {columns.map(column)} */}
        <TaskColumn title={"В очереди"} id={"queue"} />
        <TaskColumn title={"В работе"} id={"dev"} />
        <TaskColumn title={"Выполнено"} id={"done"} />
      </div>
      {/* )} */}
      {/* </Droppable>
      </DragDropContext> */}
    </div>
  );
};

export default ProjectPage;
