import React, { FC, useCallback, useRef, useState } from "react";
import cn from "classnames";
import { format, parse, differenceInHours } from "date-fns/esm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Button from "../../Inputs/Button/Button";
import { actionCreators, State } from "../../../store";
import { IModalProps, ITask } from "../../../assets/types/types";
import Input from "../../Inputs/Input/Input";
import CommentSection from "./CommentSection/CommentSection";
import SubTaskSection from "./SubTaskSection/SubTaskSection";
import TextEditor from "../../Inputs/TextEditor/TextEditor";
import Select from "../../Inputs/Select/Select";

import "./EditTask.scss";

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
  const category = useSelector(
    (state: State) =>
      state.projectData
        .filter((el) => el.project_id === project_id)[0]
        .categories.filter(
          (category) => category.category_id === category_id
        )[0]
  );
  const task = category?.tasks.filter((task) => task.task_id === task_id)[0];

  const [updatedTask, setUpdatedTask] = useState<ITask>(task);

  const updateCurrentTask = useCallback((key: string, value: string) => {
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [key]: value,
    }));
  }, []);

  function saveChanges() {
    dispatch(actionCreators.updateTask(updatedTask));
    onClose();
  }

  const [files, updateFiles] = useState<String[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const array = Object.values(e.target.files!);
    updateFiles(array.map((i) => i.name));
  };

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
          />
          <Select
            onchange={(e) => updateCurrentTask("priority", e.target.value)}
            defaultValue={task.priority}
            className={"select-border"}
          />
          <div className={cn("edit-task-modal__status")}>
            В колонке: {category.title}
          </div>

          {task.devStartTime && (
            <div className={cn("edit-task-modal__dev-time")}>
              Часов в работе:{" "}
              {!task.endDate
                ? differenceInHours(
                    new Date(),
                    parse(
                      task.devStartTime.toString(),
                      "dd.MM.yyyy HH:mm:ss",
                      new Date()
                    )
                  )
                : differenceInHours(
                    parse(
                      task.endDate.toString(),
                      "dd.MM.yyyy HH:mm:ss",
                      new Date()
                    ),
                    parse(
                      task.devStartTime.toString(),
                      "dd.MM.yyyy HH:mm:ss",
                      new Date()
                    )
                  )}
            </div>
          )}
          {task.endDate && (
            <div className={cn("edit-task-modal__end-date")}>
              Закрыта:{" "}
              {format(
                parse(
                  task.endDate.toString(),
                  "dd.MM.yyyy HH:mm:ss",
                  new Date()
                ),
                "dd.MM.yyyy"
              )}
            </div>
          )}

          <TextEditor
            task_id={"description"}
            defaultValue={task.description}
            labelValue="Описание"
            onchange={(a, editor) => {
              updateCurrentTask(
                "description",
                editor.getContent({ format: "html" })
              );
            }}
          />
          <div className={cn("edit-task-modal__file")}>
            <input
              id="files"
              type="file"
              multiple
              className={cn("edit-task-modal__file__input")}
              onChange={handleFileChange}
            />
            <label
              htmlFor="files"
              className={cn("edit-task-modal__file__label")}
            >
              + Прикрепить файл
            </label>
            <div className={cn("edit-task-modal__file__list")}>
              {files.map((i) => (
                <span>{i}</span>
              ))}
            </div>
          </div>
          <SubTaskSection task_id={task.task_id} category_id={category_id} />
          <CommentSection task_id={task.task_id} category_id={category_id} />
          <div className={cn("edit-task-modal__save-btn")}>
            <Button title={"Сохранить изменения"} click={saveChanges} />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default EditTask;
