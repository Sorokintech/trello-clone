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
import { ICategory, ITask } from "../../assets/types/types";
import { defaultTask } from "../../assets/data/mockDefaultData";
import { format } from "date-fns";

const ProjectPage: FC = () => {
  const { project_id } = useParams();
  const categories = useSelector(
    (state: State) =>
      state.projectData.filter((el) => el.project_id === project_id)[0]
        .categories
  );
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    /// менять данные для карточки тут
    const draggedItem = categories.find(
      (i) => i.category_id === source.droppableId
    )!.tasks[source.index];
    console.log("source:", source);
    console.log("destination:", destination);
    console.log("result:", result);
    console.log(draggedItem);

    if (source.droppableId !== destination.droppableId) {
      const columns = categories.map((column) => {
        if (column.category_id === source.droppableId) {
          const copiedTasks = [...column.tasks];
          copiedTasks.splice(source.index, 1);
          return {
            ...column,
            tasks: copiedTasks,
          };
        } else if (column.category_id === destination.droppableId) {
          const copiedTasks = [...column.tasks];
          draggedItem.category_id = destination.droppableId;
          if (destination.droppableId === "dev") {
            draggedItem.devStartTime === false &&
              (draggedItem.devStartTime = format(
                new Date(),
                "dd.MM.yyyy HH:mm:ss"
              ));
            draggedItem.endDate = false;
          } else if (destination.droppableId === "done") {
            draggedItem.endDate = format(new Date(), "dd.MM.yyyy HH:mm:ss");
          } else if (destination.droppableId === "queue") {
            draggedItem.devStartTime = false;
            draggedItem.endDate = false;
          }
          copiedTasks.splice(destination.index, 0, draggedItem);
          return {
            ...column,
            tasks: copiedTasks,
          };
        } else {
          return column;
        }
      });
      dispatch(actionCreators.updateCategories(columns));
    } else {
      const columns = categories.map((column) => {
        if (column.category_id === source.droppableId) {
          const copiedTasks = [...column.tasks];
          const [removed] = copiedTasks.splice(source.index, 1);
          copiedTasks.splice(destination.index, 0, removed);
          console.log("Та же колонка:", copiedTasks);
          return {
            ...column,
            tasks: copiedTasks,
          };
        } else {
          return column;
        }
      });
      dispatch(actionCreators.updateCategories(columns));
    }
  };

  function setSearchData(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(actionCreators.updateSearch(e.target.value));
  }

  return (
    <div className={cn("project-page")}>
      <Header />
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className={cn("project-page__search-bar")}>
          <label
            htmlFor="search"
            className={cn("project-page__search-bar__label")}
          >
            Поиск по задачам:
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className={cn("project-page__search-bar__input")}
            autoComplete="off"
            onChange={(e) => setSearchData(e)}
          />
        </div>
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
