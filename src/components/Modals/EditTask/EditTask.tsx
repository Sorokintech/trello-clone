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
import { Editor } from "@tinymce/tinymce-react";
import TextEditor from "../../Inputs/TextEditor/TextEditor";
import Select from "../../Inputs/Select/Select";

const EditTask: FC<IModalProps> = ({
  task_id,
  category_id,
  isOpen,
  onClose,
}) => {
  const { project_id } = useParams();
  // Ref and function for outside click close of modal
  const overlayRef = useRef(null);
  const handleOverlayClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const dispatch = useDispatch();
  const task = useSelector(
    (state: State) =>
      state.projectData
        .filter((el) => el.project_id === project_id)[0]
        .categories.filter(
          (category) => category.category_id === category_id
        )[0]
        .tasks.filter((task) => task.task_id === task_id)[0]
  );
  const [updatedTask, setUpdatedTask] = useState<ITask>(task);

  // функцию ниже, нужно просто сделать через reducer updateTask
  function updateCurrentTask(key: string, value: string) {
    setUpdatedTask({
      ...task,
      [key]: value,
    });
  }
  // Save Changes to Use CallBack with task dependency
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
        <div className={cn("edit-task-modal")}>
          <Input
            id={"title"}
            type={"text"}
            defaultValue={task.title}
            className={"input-title"}
            onchange={(e) => updateCurrentTask("title", e.target.value)}
            createDate={task.createDate}
          />
          <Select
            // labelValue="Приоритет"
            onchange={(e) => updateCurrentTask("priority", e.target.value)}
            defaultValue={task.priority}
            className={"select-border"}
          />
          <div className={cn("edit-task-modal__status")}>
            В колонке: {task.status}
          </div>

          {task.devStartTime && (
            <div className={cn("edit-task-modal__dev-time")}>
              В работе: {task.devStartTime}
            </div>
          )}
          {task.endDate && (
            <div className={cn("edit-task-modal__end-date")}>
              Закрыта: {task.endDate}
            </div>
          )}

          <TextEditor
            id={"description"}
            defaultValue={task.description}
            labelValue="Описание"
            onchange={(a, editor) => {
              updateCurrentTask(
                "description",
                editor.getContent({ format: "html" })
              );
            }}
          />
          <SubTaskSection task_id={task.task_id} category_id={category_id} />
          <CommentSection task_id={task.task_id} category_id={category_id} />
          <div className={cn("edit-task-modal__save-btn")}>
            {/* тут нужно сравнить 2 объекта на идентичность полей */}
            <Button title={"Сохранить изменения"} click={saveChanges} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditTask;
