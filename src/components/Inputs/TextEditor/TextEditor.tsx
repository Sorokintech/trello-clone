import React, { FC } from "react";

import cn from "classnames";
import "./TextEditor.scss";
import { ITextEditor } from "../../../assets/types/types";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor: FC<ITextEditor> = ({
  id,
  defaultValue,
  onchange,
  createDate,
  endDate,
}) => {
  return (
    <div key={id} className={cn("text-editor-wrapper")}>
      {createDate && (
        <label htmlFor={id} className={cn("label")}>
          Создана {createDate}
        </label>
      )}
      <Editor
        apiKey="m7uepvaogzxawj28dhra4dvd1bj2b2cjtvydtxz1ceuxpdj6"
        onEditorChange={onchange}
        initialValue={defaultValue}
        init={{
          plugins: ["quickbars"],
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
