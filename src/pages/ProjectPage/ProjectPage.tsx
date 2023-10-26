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
  // const [newIt, setNewIt] = useState<ITask>(defaultTask);

  // function Zaebal(result: DropResult) {
  //   const { source, destination, draggableId } = result;
  //   const task = categories
  //     .find((i) => i.category_id === source.droppableId)
  //     ?.tasks.find((i) => i.task_id === draggableId);
  //   dispatch(actionCreators.moveTaskFrom(task!));
  //   task!.category_id = destination?.droppableId;
  //   dispatch(actionCreators.moveTaskTo(task!));
  // }
  function searchEngine(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }

  useEffect(() => {
    dispatch(actionCreators.updateCategories(columns));
    console.log(categories);
  }, [columns]);
  return (
    <div className={cn("project-page")}>
      <Header />
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        // onDragEnd={(result) => Zaebal(result)}
      >
        <div className={cn("project-page__search-bar")}>
          <label
            htmlFor="search"
            className={cn("project-page__search-bar__label")}
          >
            Поиск по задаче:
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className={cn("project-page__search-bar__input")}
            autoComplete="off"
            onChange={(e) => searchEngine(e)}
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
