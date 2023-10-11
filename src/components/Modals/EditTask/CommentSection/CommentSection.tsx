import React, { FC, useState } from "react";
import cn from "classnames";

import "./CommentSection.scss";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import { IComment, ITask } from "../../../../assets/types/types";
import { actionCreators, State } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";

const CommentSection: FC<ITask> = ({ ...currentTask }) => {
  const state = useSelector((state: State) => state.projectData[1]);
  const [addSubComment, setAddSubComment] = useState<boolean>(false);
  const [newComment, updateNewComment] = useState<IComment>();
  const [newCommentContent, updateNewCommentContent] = useState<string>();
  const dispatch = useDispatch();
  function postComment(value: string) {
    updateNewComment({
      project_id: currentTask.project_id as string,
      task_id: currentTask.task_id,
      commentId: (currentTask.comments.length + 1).toString(),
      content: value,
      createDate: "",
    });
    dispatch(actionCreators.addComment); // не прыгает в редусер
    console.log(newComment);
    console.log(state);
    console.log("published");
  }

  return (
    <div className={cn("task-modal__comment-section")}>
      Комментарии
      {currentTask?.comments.map((item) => (
        <div
          key={item.commentId}
          className={cn("task-modal__comment-section__comment")}
        >
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
            onchange={(e) => updateNewCommentContent(e.target.value)}
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
          defaultV={""}
          onchange={(e) => updateNewCommentContent(e.target.value)}
        />
        <Button
          title={"Опубликовать"}
          className={"button-light-blue"}
          click={() => postComment(newCommentContent as string)}
        />
      </div>
    </div>
  );
};

export default CommentSection;
