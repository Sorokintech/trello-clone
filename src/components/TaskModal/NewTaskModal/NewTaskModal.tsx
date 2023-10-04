import React, { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";

import "./NewTaskModal.scss";

import { useDispatch } from "react-redux";
import { IModalProps, ITask } from "../../../assets/types/types";
import Button from "../../Inputs/Button/Button";

const NewTaskModal: FC<IModalProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  const [newTask, updateNewTask] = useState<ITask>();
  const [newTaskTitle, updateNewTaskTitle] = useState<string>("");
  const [newTaskDescription, updateNewTaskDescription] = useState<string>("");
  const [newTaskPriority, updateNewTaskPriority] = useState<string>("");
  const dispatch = useDispatch();
  function taskCreateHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.target.id === "title"
      ? updateNewTaskTitle(e.target.value)
      : updateNewTaskDescription(e.target.value);
  }

  function createNewTask() {
    updateNewTask({
      category: "queue",
      task_id: "30",
      task_number: "4",
      title: newTaskTitle,
      description: newTaskDescription,
      priority: newTaskPriority,
      createDate: "04.10.2023",
      devTime: "В очереди",
      endDate: "В очереди",
      status: "В очереди",
      subtasks: [],
      comments: [],
    });
    console.log(newTask);
  }

  useEffect(() => {
    console.log(`Title: ${newTaskTitle}`);
    console.log(`Description: ${newTaskDescription}`);
    console.log();
  }, [newTaskDescription, newTaskTitle]);

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

export default NewTaskModal;
