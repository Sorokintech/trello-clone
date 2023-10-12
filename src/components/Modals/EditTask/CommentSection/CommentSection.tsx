import React, { FC, useEffect, useState } from "react";
import cn from "classnames";

import "./CommentSection.scss";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import { IComment, ITask } from "../../../../assets/types/types";
import { actionCreators, State } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { format, compareAsc } from "date-fns";
import { useParams } from "react-router-dom";

const CommentSection: FC<{ task_id: string }> = ({ task_id }) => {
  const { project_id } = useParams();
  const state = useSelector((state: State) => state.projectData);
  const task = state
    .filter((el) => el.project_id === project_id)[0]
    .tasks.filter((task) => task.task_id === task_id)[0];
  // ^?
  const commentsAmount = task.comments.length;
  const [addSubComment, setAddSubComment] = useState<boolean>(false);
  const [inputDefaultValue, updateInputDefaultValue] = useState<string>("");
  const [newComment, setNewComment] = useState<IComment>({
    project_id: task.project_id,
    task_id: task.task_id,
    comment_id: "",
    content: "",
    createDate: "",
  });

  const dispatch = useDispatch();
  function updateNewComment(key: string, value: string) {
    let date = new Date();
    setNewComment((prevState) => ({
      ...prevState,
      [key]: value,
      createDate: format(date, "HH:mm"),
      comment_id: (task.comments.length + 1).toString(),
    }));
    console.log(newComment);
  }
  function postComment() {
    dispatch(actionCreators.addComment(newComment));
  }
  useEffect(() => {
    console.log(newComment);
  }, [newComment]);

  return (
    <div className={cn("task-modal__comment-section")}>
      Комментарии
      {task.comments.map((item) => (
        <div
          key={item.comment_id}
          className={cn("task-modal__comment-section__comment")}
        >
          <div
            className={cn("task-modal__comment-section__comment__content")}
            key={item.comment_id}
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
            // onchange={(e) => updateNewCommentContent(e.target.value)}
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
          defaultV={newComment.content}
          onchange={(e) => updateNewComment("content", e.target.value)}
        />
        <Button
          title={"Опубликовать"}
          className={"button-light-blue"}
          click={() => postComment()}
        />
      </div>
    </div>
  );
};

export default CommentSection;
