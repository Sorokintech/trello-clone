import React, { FC } from "react";

import cn from "classnames";
import "./TextEditor.scss";
import { ISubTask, ITextEditor } from "../../../assets/types/types";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { State } from "../../../store";

const TextEditor: FC<ITextEditor> = ({
  project_id,
  task_id,
  subtask_id,
  id,
  defaultValue,
  onchange,
  createDate,
  done,
}) => {
  const state = useSelector((state: State) => state.projectData);
  const endDate = state
    .filter((project) => project.project_id === project_id)[0]
    ?.tasks.filter((task) => task.task_id === task_id)[0]
    ?.subtasks.filter(
      (subtask) => subtask.subtask_id === subtask_id
    )[0].endDate;
  return (
    <div key={id} className={cn("text-editor-wrapper")}>
      {!endDate
        ? createDate && (
            <label htmlFor={id} className={cn("label")}>
              Подзадача №{id} создана {createDate}
            </label>
          )
        : endDate && (
            <label htmlFor={id} className={cn("label-done")}>
              Подзадача №{id} закрыта {endDate}
            </label>
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
