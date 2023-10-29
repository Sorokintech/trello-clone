import React, { FC, useRef, useState } from "react";
import cn from "classnames";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { IModalProps, ITask } from "../../../assets/types/types";
import Button from "../../Inputs/Button/Button";
import { actionCreators, State } from "../../../store";
import Input from "../../Inputs/Input/Input";
import Select from "../../Inputs/Select/Select";
import { defaultTask } from "../../../assets/data/mockDefaultData";

import "./CreateTask.scss";

const CreateTask: FC<IModalProps> = ({ isOpen, onClose }) => {
  const { project_id } = useParams();
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
      updateFormIsValid(true);
      setNewTask(defaultTask);
    }
  };
  const [newTask, setNewTask] = useState<ITask>(defaultTask);
  const [formIsValid, updateFormIsValid] = useState<boolean>(true);

  const dispatch = useDispatch();

  const tasksAmount = useSelector((state: State) =>
    state.projectData
      .filter((el) => el.project_id === project_id)[0]
      .categories.reduce((total, category) => total + category.tasks.length, 0)
  );

  function updateNewTask(key: string, value: string) {
    setNewTask((prevState) => ({
      ...prevState,
      [key]: value,
      project_id: project_id,
      task_id: format(new Date(), "dd.MM.yyyy HH:mm:ss"),
      task_number: (tasksAmount + 1).toString(),
    }));
  }
  function createNewTask() {
    if (newTask.title === "") {
      updateFormIsValid(false);
    } else {
      updateFormIsValid(true);
      console.log(newTask);
      dispatch(actionCreators.addTask(newTask));
      setNewTask(defaultTask);
      onClose();
    }
  }

  return isOpen ? (
    <div className="container">
      <div className="wrapper" ref={overlayRef} onClick={handleOverlayClick}>
        <div className={cn("create-task-modal")}>
          <Input
            id="title"
            type="text"
            labelValue="Добавьте название"
            placeholder="Захватить мир.."
            className={"input"}
            defaultValue={""}
            onchange={(e) => updateNewTask("title", e.target.value)}
          />
          <Select
            labelValue="Задайте приоритет"
            onchange={(e) => updateNewTask("priority", e.target.value)}
          />
          {!formIsValid && (
            <span className={cn("create-task-modal__error-message")}>
              Пожалуйста, добавьте название задачи
            </span>
          )}
          <Button title={"Создать задачу"} click={() => createNewTask()} />
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateTask;
