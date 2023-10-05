import React, { FC, useRef, useState } from "react";
import cn from "classnames";

import "./TaskModal.scss";
import Button from "../Inputs/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../store";
import { IModalProps } from "../../assets/types/types";

const TaskModal: FC<IModalProps> = ({ id, task_id, isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  const currentTask = useSelector((state: State) => state.currentTask);
  const [taskDescription, setTaskDescription] = useState<string>(
    currentTask.description
  );
  const [taskTitle, setTaskTitle] = useState<string>(currentTask.title);
  // console.log(taskDescription);
  const dispatch = useDispatch();
  function hello() {
    dispatch(actionCreators.addSubTask());
  }

  return isOpen ? (
    <div className="container">
      <div className="wrapper" ref={overlayRef} onClick={handleOverlayClick}>
        <div className={cn("task-modal")}>
          <div className={cn("task-modal__number")}>
            #{currentTask.task_number}
          </div>
          <input
            type="text"
            className={cn("task-modal__title")}
            defaultValue={currentTask.title}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <div className={cn("task-modal__create-date")}>
            от {currentTask.createDate}
          </div>
          <input
            typeof="textarea"
            className={cn("task-modal__description")}
            defaultValue={currentTask.description}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
          <div className={cn("task-modal__priority")} onClick={() => hello()}>
            Приоритет: {currentTask.priority}
          </div>
          <div className={cn("task-modal__dev-time")}>
            В работе: {currentTask.devTime}
          </div>
          <div className={cn("task-modal__end-date")}>
            Закрыта: {currentTask.endDate}
          </div>

          <div className={cn("task-modal__status")}>{currentTask.status}</div>
          <div className={cn("task-modal__sub-task-section")}>
            <Button title={"+ Добавить подзадачу"} className={"button-dark"} />
            {currentTask.subtasks.map((item) => (
              <div className={cn("task-modal__sub-task-section__item")}>
                <div
                  key={item.subTaskId}
                  className={cn("task-modal__sub-task-section__item__content")}
                >
                  {item.content}
                </div>
                <Button title={"Выполнено"} className={"button-dark"} />
              </div>
            ))}
          </div>
          <div className={cn("task-modal__comment-section")}>
            Комментарии
            {currentTask?.comments.map((item) => (
              <div
                className={cn("task-modal__comment-section__comment")}
                key={item.commentId}
              >
                {item.content}
              </div>
            ))}
            <div className={cn("task-modal__comment-section__add-comment")}>
              {" "}
              <input
                type="textarea"
                className={cn(
                  "task-modal__comment-section__add-comment__input"
                )}
              />
              <Button title={"Опубликовать"} className={"button-dark"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TaskModal;
