import React, { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";

import "./CreateTask.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IModalProps, ITask } from "../../../assets/types/types";
import Button from "../../Inputs/Button/Button";
import { actionCreators, State } from "../../../store";
import { format, compareAsc } from "date-fns";
import Input from "../../Inputs/Input/Input";

const CreateTask: FC<IModalProps> = ({ isOpen, onClose }) => {
  const { project_id } = useParams();
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  const [newTask, setNewTask] = useState<ITask>({
    project_id: project_id,
    category: "queue",
    task_id: "",
    task_number: "",
    title: "",
    description: "",
    priority: "",
    createDate: "",
    createTime: "",
    devStartTime: "В очереди",
    endDate: "В очереди",
    status: "В очереди",
    subtasks: [],
    comments: [],
  });
  const [formIsValid, updateFormIsValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const state = useSelector((state: State) => state.projectData);
  const tasksAmount = state.filter((el) => el.project_id === project_id)[0]
    .tasks.length;

  function updateNewTask(key: string, value: string) {
    let date = new Date();
    setNewTask((prevState) => ({
      ...prevState,
      [key]: value,
      task_id: (tasksAmount + 1).toString(),
      task_number: (tasksAmount + 1).toString(),
      createDate: format(date, "dd.MM.yyyy"),
      createTime: format(date, "HH:mm"),
    }));
  }
  function createNewTask() {
    if (newTask.title === "" || newTask.description === "") {
      updateFormIsValid(false);
    } else {
      updateFormIsValid(true);
      dispatch(actionCreators.addTask(newTask));
      onClose();
    }
  }

  // useEffect(() => {
  //   console.log(newTask);
  //   console.log(state[0]);
  // }, [newTask, state]);

  return isOpen ? (
    <div className="container">
      <div className="wrapper" ref={overlayRef} onClick={handleOverlayClick}>
        <div className={cn("new-task-modal")}>
          <label htmlFor="title" className={cn("new-task-modal__label")}>
            Добавьте название задачи
          </label>
          <Input
            id="title"
            type="text"
            className={cn("new-task-modal__input")}
            placeholder="Захватить мир.."
            defaultV={""}
            onchange={(e) => updateNewTask("title", e.target.value)}
          />
          <label htmlFor="description" className={cn("new-task-modal__label")}>
            Добавьте описание задачи
          </label>
          <Input
            id="description"
            type="text"
            className={cn("new-task-modal__input")}
            placeholder="Первым делом нужно..."
            defaultV={""}
            onchange={(e) => updateNewTask("description", e.target.value)}
          />
          <label
            htmlFor="priority"
            className={cn("new-task-modal__label")}
          ></label>
          Выберите приоритет задачи
          <select
            onChange={(e) => updateNewTask("priority", e.target.value)}
            name="priority"
            id="priority"
            className={cn("new-task-modal__input")}
          >
            <option value="Высокий">Высокий</option>
            <option value="Средний">Средний</option>
            <option value="Низкий">Низкий</option>
          </select>
          {!formIsValid && (
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
