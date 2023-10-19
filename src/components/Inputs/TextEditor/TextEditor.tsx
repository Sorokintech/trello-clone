import React, { FC } from "react";

import cn from "classnames";
import "./TextEditor.scss";
import { ISubTask, ITextEditor } from "../../../assets/types/types";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { State } from "../../../store";

const TextEditor: FC<ITextEditor> = ({
  project_id,
  category_id,
  task_id,
  subtask_id,
  id,
  defaultValue,
  labelValue,
  onchange,
  createDate,
  done,
}) => {
  const endDate = useSelector(
    (state: State) =>
      state.projectData
        .filter((project) => project.project_id === project_id)[0]
        //           ^?
        ?.categories.filter(
          (category) => category.category_id === category_id
        )[0]
        ?.tasks.filter((task) => task.task_id === task_id)[0]
        ?.subtasks.filter((subtask) => subtask.subtask_id === subtask_id)[0]
        .endDate
  );
  return (
    <div key={id} className={cn("text-editor")}>
      {labelValue && (
        <label htmlFor={id} className={cn("text-editor__label")}>
          {labelValue}
        </label>
      )}
      {!endDate
        ? createDate && (
            <div className={cn("text-editor__date-label")}>
              Подзадача №{id} создана {createDate}
            </div>
          )
        : endDate && (
            <div className={cn("text-editor__date-label-done")}>
              Подзадача №{id} закрыта {endDate}
            </div>
          )}

      <Editor
        apiKey="m7uepvaogzxawj28dhra4dvd1bj2b2cjtvydtxz1ceuxpdj6"
        onEditorChange={onchange}
        initialValue={defaultValue}
        disabled={done}
        init={{
          plugins: ["quickbars"],
          placeholder: "Добавьте описание...",
          content_style: `.mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: #274c77;
          margin-left: 0.625rem;
          font-size: 0.825rem;
          }`,
          toolbar: false,
          menubar: false,
          inline: true,
          quicklink: true,
          quickbars_insert_toolbar: false,
          quickbars_selection_toolbar: "bold italic | forecolor | blockquote",
        }}
      />
    </div>
  );
};

export default TextEditor;
