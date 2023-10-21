import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import Header from "../../components/Header/Header";
import { actionCreators, State } from "../../store";
import "./ProjectPage.scss";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { ICategory } from "../../assets/types/types";

const ProjectPage: FC = () => {
  const { project_id } = useParams();
  const categories = useSelector(
    (state: State) =>
      state.projectData.filter((el) => el.project_id === project_id)[0]
        .categories
  );
  const [columns, setColumns] = useState<ICategory[]>(categories);
  const onDragEnd = (
    result: DropResult,
    columns: ICategory[],
    setColumns: Dispatch<SetStateAction<ICategory[]>>
  ) => {
    // console.log(result);
    if (!result.destination) return;
    const { source, destination } = result;
    const column = columns.find(
      (column) => column.category_id === source.droppableId
    );
    if (column !== undefined) {
      const copiedTasks = [...column.tasks];
      console.log(copiedTasks);
      const [removed] = copiedTasks.splice(source.index, 1);
      console.log([removed]);
      copiedTasks.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks,
        },
      });
      console.log(copiedTasks);
    }

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
    <div className={cn("project-page")}>
      <Header />
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className={cn("project-page__task-container")}>
          {columns.map((category) => (
            <Droppable
              droppableId={category.category_id}
              key={category.category_id}
            >
              {(provided, snapshot) => (
                <TaskColumn
                  title={category.title}
                  category_id={category.category_id}
                  provided={provided}
                />
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default ProjectPage;
