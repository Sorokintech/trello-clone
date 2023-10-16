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
import Select from "../../Inputs/Select/Select";
import { defaultTask } from "../../../assets/data/mockDefaultData";

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

  const tasksAmount = useSelector(
    (state: State) =>
      state.projectData.filter((el) => el.project_id === project_id)[0].tasks
        .length
  );

  function updateNewTask(key: string, value: string) {
    let date = new Date();
    setNewTask((prevState) => ({
      ...prevState,
      [key]: value,
      project_id: project_id,
      task_id: (tasksAmount + 1).toString(),
      task_number: (tasksAmount + 1).toString(),
      createDate: format(date, "dd.MM.yyyy"),
      createTime: format(date, "HH:mm"),
    }));
  }
  function createNewTask() {
    if (newTask.title === "") {
      updateFormIsValid(false);
    } else {
      updateFormIsValid(true);
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
            labelValue="Добавьте название задачи"
            placeholder="Захватить мир.."
            className={"input"}
            defaultValue={""}
            onchange={(e) => updateNewTask("title", e.target.value)}
          />
          <Input
            id="description"
            labelValue="Добавьте описание задачи"
            type="text"
            placeholder="Первым делом нужно..."
            className={"input"}
            defaultValue={""}
            onchange={(e) => updateNewTask("description", e.target.value)}
          />
          <Select
            labelValue="Задайте приоритет задачи"
            onchange={(e) => updateNewTask("priority", e.target.value)}
          />
          {!formIsValid && (
            <span className={cn("create-task-modal__error-message")}>
              Пожалуйста, задайте название задачи
            </span>
          )}
          <Button
            title={"Создать задачу"}
            // className={"button-dark"}
            click={() => createNewTask()}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateTask;
