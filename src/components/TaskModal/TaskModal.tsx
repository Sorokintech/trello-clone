import React, { FC, useRef, useState } from "react";
import cn from "classnames";

import "./TaskModal.scss";
import Button from "../Inputs/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "../../store";

interface IModalProps {
  id: string;
  task_id: string;
  isOpen: boolean;
  onClose: () => void;
}

const TaskModal: FC<IModalProps> = ({ id, task_id, isOpen, onClose }) => {
  // const [content, setContent] = useState();
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };
  const dispatch = useDispatch();
  function hello() {
    dispatch(actionCreators.addSubTask());
  }
  const currentTask = useSelector((state: State) => state.currentTask);
  return isOpen ? (
    <div className="container">
      <div className="wrapper" ref={overlayRef} onClick={handleOverlayClick}>
        <div className={cn("task-modal")}>
          <div className={cn("task-modal__number")}>
            #{currentTask.task_number}
          </div>
          <div className={cn("task-modal__title")}>{currentTask.title}</div>
          <div className={cn("task-modal__create-date")}>
            от {currentTask.createDate}
          </div>
          <div className={cn("task-modal__description")}>
            Добавить стилей для главной страницы и страниц товаров
          </div>
          <div className={cn("task-modal__priority")} onClick={() => hello()}>
            {currentTask.priority}
          </div>
          <div className={cn("task-modal__dev-time")}>
            В работе: {currentTask.devTime}
          </div>
          <div className={cn("task-modal__end-date")}>
            Закрыта: {currentTask.endDate}
          </div>

          <div className={cn("task-modal__status")}>{currentTask.status}</div>
          <div className={cn("task-modal__sub-task-section")}>
            <Button title={"+ Добавить подзадачу"} />
          </div>
          <div className={cn("task-modal__comment-section")}></div>
        </div>
      </div>
    </div>
  ) : null;
};

export default TaskModal;
