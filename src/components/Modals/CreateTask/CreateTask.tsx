import React, { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";

import "./CreateTask.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IModalProps, ITask } from "../../../assets/types/types";
import Button from "../../Inputs/Button/Button";
import { actionCreators, State } from "../../../store";
import { format, compareAsc } from "date-fns";

const CreateTask: FC<IModalProps> = ({ isOpen, onClose }) => {
  const { project_id } = useParams();
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  const [newTaskTitle, updateNewTaskTitle] = useState<string>("");
  const [newTaskDescription, updateNewTaskDescription] = useState<string>("");
  const [newTaskPriority, updateNewTaskPriority] = useState<string>("Высокий");
  const [newTask, updateNewTask] = useState<ITask>();
  const [formValidation, updateFormValidation] = useState<boolean>(true);

  const dispatch = useDispatch();

  function taskCreateHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.id === "title"
      ? updateNewTaskTitle(e.target.value)
      : updateNewTaskDescription(e.target.value);
  }
  const state = useSelector((state: State) => state.projectData);
  const tasksAmount = state.filter((el) => el.projectId === project_id)[0].tasks
    .length;
  function createNewTask() {
    if (newTaskTitle === "" || newTaskDescription === "") {
      updateFormValidation(false);
    } else {
      let date = new Date();
      updateNewTask({
        category: "queue",
        task_id: (tasksAmount + 1).toString(),
        task_number: (tasksAmount + 1).toString(),
        title: newTaskTitle,
        description: newTaskDescription,
        priority: newTaskPriority,
        createDate: format(date, "dd.MM.yyyy"),
        createTime: format(date, "HH:mm"),
        devStartTime: "В очереди",
        endDate: "В очереди",
        status: "В очереди",
        subtasks: [],
        comments: [],
      });
      updateFormValidation(true);
      onClose();
    }
  }

  useEffect(() => {
    console.log(newTask);
  }, [newTask]);

  return isOpen ? (
    <div className="container">
      <div className="wrapper" ref={overlayRef} onClick={handleOverlayClick}>
        <div className={cn("new-task-modal")}>
          <label htmlFor="title" className={cn("new-task-modal__label")}>
            Добавьте название задачи
          </label>
          <input
            id="title"
            type="text"
            className={cn("new-task-modal__input")}
            placeholder="Захватить мир.."
            defaultValue={newTaskTitle}
            onChange={taskCreateHandler}
          />
          <label htmlFor="description" className={cn("new-task-modal__label")}>
            Добавьте описание задачи
          </label>
          <input
            id="description"
            type="text"
            className={cn("new-task-modal__input")}
            placeholder="Первым делом нужно..."
            defaultValue={newTaskDescription}
            onChange={taskCreateHandler}
          />
          <label
            htmlFor="priority"
            className={cn("new-task-modal__label")}
          ></label>
          Выберите приоритет задачи
          <select
            onChange={(e) => updateNewTaskPriority(e.target.value)}
            name="priority"
            id="priority"
            className={cn("new-task-modal__input")}
          >
            <option value="Высокий">Высокий</option>
            <option value="Средний">Средний</option>
            <option value="Низкий">Низкий</option>
          </select>
          {!formValidation && (
            <div className={cn("new-task-modal__error-message")}>
              Введите название и задайте описание задачи
            </div>
          )}
          <div className={cn("new-task-modal__btn-container")}>
            <Button
              title={"Создать задачу"}
              className={"button-dark"}
              click={() => createNewTask()}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateTask;
