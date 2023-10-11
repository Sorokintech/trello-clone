import React, { FC, useState } from "react";
import cn from "classnames";

import "./CommentSection.scss";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import { ITask } from "../../../../assets/types/types";

const CommentSection: FC<ITask> = ({ ...currentTask }) => {
  const [addSubComment, setAddSubComment] = useState<boolean>(false);
  const [newComment, updateNewComment] = useState<string>("");

  return (
    <div className={cn("task-modal__comment-section")}>
      Комментарии
      {currentTask?.comments.map((item) => (
        <div className={cn("task-modal__comment-section__comment")}>
          <div
            className={cn("task-modal__comment-section__comment__content")}
            key={item.commentId}
          >
            {item.content}
          </div>
          <Button
            title={"Ответить"}
            className={"button-light-blue"}
            click={() => setAddSubComment(true)}
          />
        </div>
      ))}
      {addSubComment && (
        <div className={cn("task-modal__comment-section__add-sub-comment")}>
          <Input
            id={"subtask-add"}
            type={"text"}
            placeholder={"Дополните комментарий..."}
            defaultV={""}
            // onchange={(e) => setSubComment(e.target.value)}
          />
          <Button title={"Дополнить"} className={"button-light-blue"} />
        </div>
      )}
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
  );
};

export default CommentSection;
