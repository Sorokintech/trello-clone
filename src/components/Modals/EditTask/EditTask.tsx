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

const EditTask: FC<IModalProps> = ({ id, task_id, isOpen, onClose }) => {
  // Ref and function for outside click close of modal
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  const currentTask = useSelector((state: State) => state.currentTask);
  const [updatedTask, setUpdatedTask] = useState<ITask>(currentTask);
  const dispatch = useDispatch();
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
    onClose();
  }

  useEffect(() => {
    if (Object.keys(currentTask).length > 0) {
      setUpdatedTask(currentTask);
    }
  }, [currentTask]);
  return isOpen ? (
    <div className="container">
      <div className="wrapper" ref={overlayRef} onClick={handleOverlayClick}>
        <div className={cn("task-modal")}>
          <div className={cn("task-modal__number")}>
            #{currentTask.task_number}
          </div>
          <Input
            id={"title"}
            type={"text"}
            defaultV={currentTask.title}
            className={"input-title-edit"}
            onchange={(e) => updateCurrentTask("title", e.target.value)}
          />
          <div className={cn("task-modal__create-date")}>
            от {updatedTask.createDate}
          </div>
          <Input
            id={"description"}
            type={"textarea"}
            defaultV={currentTask.description}
            className={"input-description-edit"}
            onchange={(e) => updateCurrentTask("description", e.target.value)}
          />
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
            defaultValue={currentTask.priority}
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
          <div className={cn("task-modal__status")}>{updatedTask.status}</div>
          <SubTaskSection {...updatedTask} />
          <CommentSection {...updatedTask} />
          <div className={cn("task-modal__save-btn")}>
            <Button
              title={"Сохранить изменения"}
              className={"button-light-blue"}
              click={saveChanges}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditTask;
