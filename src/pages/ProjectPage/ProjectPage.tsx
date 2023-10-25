import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";
import cn from "classnames";

import Header from "../../components/Header/Header";
import { actionCreators, State } from "../../store";
import "./ProjectPage.scss";
import TaskColumn from "../../components/TaskColumn/TaskColumn";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ICategory } from "../../assets/types/types";

const ProjectPage: FC = () => {
  const { project_id } = useParams();
  const categories = useSelector(
    (state: State) =>
      state.projectData.filter((el) => el.project_id === project_id)[0]
        .categories
  );
  const [columns, setColumns] = useState<ICategory[]>(categories);
  const dispatch = useDispatch();
  const onDragEnd = (
    result: DropResult,
    columns: ICategory[],
    setColumns: Dispatch<SetStateAction<ICategory[]>>
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const draggedItem = columns.find(
      (i) => i.category_id === source.droppableId
    )!.tasks[source.index];
    console.log("source:", source);
    console.log("destination:", destination);
    console.log("result:", result);

    if (source.droppableId !== destination.droppableId) {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.category_id === source.droppableId) {
            const copiedTasks = [...column.tasks];
            copiedTasks.splice(source.index, 1);
            console.log(copiedTasks);
            // const [removed] = copiedTasks.splice(source.index, 1);
            // copiedTasks.splice(destination.index, 0, removed);
            return {
              ...column,
              tasks: copiedTasks,
            };
          } else if (column.category_id === destination.droppableId) {
            const copiedTasks = [...column.tasks];
            draggedItem.category_id = destination.droppableId;
            copiedTasks.splice(destination.index, 0, draggedItem);
            console.log(copiedTasks);
            return {
              ...column,
              tasks: copiedTasks,
            };
          } else {
            return column;
          }
        });
      });
    } else {
      setColumns((prevState) => {
        return prevState.map((column) => {
          if (column.category_id === source.droppableId) {
            const copiedTasks = [...column.tasks];
            const [removed] = copiedTasks.splice(source.index, 1);
            copiedTasks.splice(destination.index, 0, removed);

            return {
              ...column,
              tasks: copiedTasks,
            };
          } else {
            return column;
          }
        });
      });
    }
  };
  useEffect(() => {
    dispatch(actionCreators.updateCategories(columns));
    console.log(categories);
  }, [columns, dispatch, categories]);
  return (
    <div className={cn("project-page")}>
      <Header />
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        <div className={cn("project-page__task-container")}>
          {categories.map((category) => (
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
