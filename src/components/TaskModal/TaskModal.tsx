import React, { FC, useRef, useState } from "react";
import cn from "classnames";

import "./TaskModal.scss";
import Button from "../Inputs/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../store";
import { IModalProps } from "../../assets/types/types";
import Input from "../Inputs/Input/Input";

const TaskModal: FC<IModalProps> = ({ id, task_id, isOpen, onClose }) => {
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
      setAddSubTask(false);
    }
  };
  const currentTask = useSelector((state: State) => state.currentTask);
  const [taskDescription, setTaskDescription] = useState<string>(
    currentTask.description
  );
  const [taskTitle, setTaskTitle] = useState<string>(currentTask.title);
  const [subTask, updateSubTask] = useState<string>("");
  const [newComment, updateNewComment] = useState<string>("");
  const [taskDone, setTaskDone] = useState<boolean>(false);
  const [addSubTask, setAddSubTask] = useState<boolean>(false);
  const dispatch = useDispatch();

  function addSubTaskHandler() {
    if (subTask.length > 1) {
      console.log(subTask);
      setAddSubTask(false);
      updateSubTask("");
    }
  }
  function hello() {
    dispatch(actionCreators.addSubTask());
  }
  console.log(newComment);

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
            В работе: {currentTask.devStartTime}
          </div>
          <div className={cn("task-modal__end-date")}>
            Закрыта: {currentTask.endDate}
          </div>

          <div className={cn("task-modal__status")}>{currentTask.status}</div>
          <div className={cn("task-modal__sub-task-section")}>
            <Button
              title={"+ Добавить подзадачу"}
              className={"button-light-blue"}
              click={() => setAddSubTask(true)}
            />
            {addSubTask && (
              <div className={cn("task-modal__sub-task-section__add-subtask")}>
                <Input
                  id={"subtask"}
                  type={"text"}
                  placeholder={"Добавьте описание..."}
                  defaultV={subTask}
                  onchange={(e) => updateSubTask(e.target.value)}
                />
                <Button
                  title={"Добавить"}
                  className={"button-light-blue"}
                  click={addSubTaskHandler}
                />
              </div>
            )}
            {currentTask.subtasks.map((item) => (
              <div className={cn("task-modal__sub-task-section__item")}>
                <div
                  key={item.subTaskId}
                  className={cn("task-modal__sub-task-section__item__content")}
                >
                  {item.content}
                </div>
                <Button title={"Выполнено"} className={"button-light-blue"} />
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
              <Input
                id={"comment"}
                type={"text"}
                placeholder={"Оставьте комментарий..."}
                defaultV={newComment}
                onchange={(e) => updateNewComment(e.target.value)}
              />
              <Button title={"Опубликовать"} className={"button-light-blue"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TaskModal;
