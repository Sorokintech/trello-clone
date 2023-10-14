import React, { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";

import "./EditTask.scss";
import Button from "../../Inputs/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../../store";
import { IModalProps, ITask } from "../../../assets/types/types";
import Input from "../../Inputs/Input/Input";
import CommentSection from "./CommentSection/CommentSection";
import SubTaskSection from "./SubTaskSection/SubTaskSection";
import { useParams } from "react-router-dom";
import TextArea from "../../Inputs/TextArea/TextArea";

const EditTask: FC<IModalProps> = ({ task_id, isOpen, onClose }) => {
  // Ref and function for outside click close of modal
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const dispatch = useDispatch();
  const { project_id } = useParams();
  const state = useSelector((state: State) => state.projectData);
  const task = state
    .filter((el) => el.project_id === project_id)[0]
    .tasks.filter((task) => task.task_id === task_id)[0];
  const [updatedTask, setUpdatedTask] = useState<ITask>(task);

  // функцию ниже, нужно просто сделать через reducer updateTask
  function updateCurrentTask(key: string, value: string) {
    setUpdatedTask((prevState) => ({
      ...prevState,
      [key]: value,
    }));
    console.log(updatedTask);
  }

  // function hello() {
  //   dispatch(actionCreators.addSubTask());
  // }
  function saveChanges() {
    dispatch(actionCreators.updateTask(updatedTask));

    onClose();
  }

  useEffect(() => {
    if (Object.keys(task).length > 0) {
      setUpdatedTask(task);
    }
  }, [task]);
  return isOpen ? (
    <div className="container">
      <div className="wrapper" ref={overlayRef} onClick={handleOverlayClick}>
        <div className={cn("task-modal")}>
          {/* <div className={cn("task-modal__number")}>#{task.task_number}</div> */}
          <Input
            id={"title"}
            type={"text"}
            defaultV={task.title}
            className={"input-title-edit"}
            onchange={(e) => updateCurrentTask("title", e.target.value)}
            createDate={task.createDate}
          />
          {/* <div className={cn("task-modal__create-date")}>
            от {updatedTask.createDate}
          </div> */}
          <div className={cn("task-modal__status")}>
            В колонке: {task.status}
          </div>
          <label
            htmlFor="priority"
            className={cn("task-modal__priority-label")}
          >
            Приоритет:
          </label>
          <select
            onChange={(e) => updateCurrentTask("priority", e.target.value)}
            name="priority"
            id="priority"
            className={cn("task-modal__priority")}
            defaultValue={task.priority}
          >
            <option value="Высокий">Высокий</option>
            <option value="Средний">Средний</option>
            <option value="Низкий">Низкий</option>
          </select>
          <div className={cn("task-modal__dev-time")}>
            В работе: {updatedTask.devStartTime}
          </div>
          <div className={cn("task-modal__end-date")}>
            Закрыта: {updatedTask.endDate}
          </div>
          <label
            htmlFor="description"
            className={cn("task-modal__description-label")}
          >
            Описание
          </label>
          {/* <TextArea
            id={"description"}
            type={"text"}
            defaultV={task.description}
            oninput={(e) => updateCurrentTask("description", e.target.value)}
          /> */}
          <Input
            id={"description"}
            type={"text"}
            defaultV={task.description}
            className={"input-description-edit"}
            onchange={(e) => updateCurrentTask("description", e.target.value)}
          />

          <SubTaskSection task_id={task.task_id} />
          <CommentSection task_id={task.task_id} />
          <div className={cn("task-modal__save-btn")}>
            <Button title={"Сохранить изменения"} click={saveChanges} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditTask;
