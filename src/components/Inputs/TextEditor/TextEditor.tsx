import React, { FC } from "react";

import cn from "classnames";
import "./TextEditor.scss";
import { ISubTask, ITextEditor } from "../../../assets/types/types";
import { Editor } from "@tinymce/tinymce-react";
import { useSelector } from "react-redux";
import { State } from "../../../store";

const TextEditor: FC<ITextEditor> = ({
  ...props
  // project_id,
  // category_id,
  // task_id,
  // subtask_id,
  // id,
  // defaultValue,
  // labelValue,
  // onchange,
  // createDate,
  // done,
}) => {
  const endDate = useSelector(
    (state: State) =>
      state.projectData
        .find((project) => project.project_id === props.project_id)
        ?.categories.find((cat) => cat.category_id === props.category_id)
        ?.tasks.find((task) => task.task_id === props.task_id)
        ?.subtasks.find((subtask) => subtask.subtask_id === props.subtask_id)
        ?.endDate
  );
  return (
    <div key={props.subtask_id} className={cn("text-editor")}>
      {props.labelValue && (
        <label htmlFor={props.subtask_id} className={cn("text-editor__label")}>
          {props.labelValue}
        </label>
      )}
      {!endDate
        ? props.createDate && (
            <div className={cn("text-editor__date-label")}>
              Подзадача №{props.subtask_id} создана {props.createDate}
            </div>
          )
        : endDate && (
            <div className={cn("text-editor__date-label-done")}>
              Подзадача №{props.subtask_id} закрыта {endDate}
            </div>
          )}

      <Editor
        apiKey="m7uepvaogzxawj28dhra4dvd1bj2b2cjtvydtxz1ceuxpdj6"
        onEditorChange={props.onchange}
        initialValue={props.defaultValue}
        disabled={props.done}
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
