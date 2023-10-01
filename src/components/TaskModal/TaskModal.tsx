import React, { FC } from "react";
import cn from "classnames";

import "./TaskModal.scss";
import Button from "../Inputs/Button/Button";

const TaskModal: FC = () => {
  return (
    <div className={cn("task-modal")}>
      <div className={cn("task-modal__number")}>#1</div>
      <div className={cn("task-modal__title")}>Добавить стили</div>
      <div className={cn("task-modal__create-date")}>от 29.09.2023</div>
      <div className={cn("task-modal__description")}>
        Добавить стилей для главной страницы и страниц товаров
      </div>
      <div className={cn("task-modal__priority")}>Важный</div>
      <div className={cn("task-modal__dev-time")}>В работе: 0 часов</div>
      <div className={cn("task-modal__end-date")}>Закрыта: в работе</div>

      <div className={cn("task-modal__status")}>В работе</div>
      <div className={cn("task-modal__sub-task-section")}>
        <Button title={"+ Добавить подзадачу"} />
      </div>
      <div className={cn("task-modal__comment-section")}></div>
    </div>
  );
};

export default TaskModal;
