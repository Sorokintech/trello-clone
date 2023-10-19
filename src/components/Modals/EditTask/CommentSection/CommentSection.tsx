import React, { FC, ReactNode, useEffect, useState } from "react";
import cn from "classnames";

import "./CommentSection.scss";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import { IComment, ISubComment, ITask } from "../../../../assets/types/types";
import { actionCreators, State } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { format, compareAsc } from "date-fns";
import { useParams } from "react-router-dom";

const CommentSection: FC<{
  task_id: string;
  category_id: string | undefined;
}> = ({ task_id, category_id }) => {
  const { project_id } = useParams();
  const task = useSelector(
    (state: State) =>
      state.projectData
        .filter((el) => el.project_id === project_id)[0]
        .categories.filter(
          (category) => category.category_id === category_id
        )[0]
        .tasks.filter((task) => task.task_id === task_id)[0]
  );
  const commentsAmount = task.comments.length;
  const [addSubComment, setAddSubComment] = useState<boolean>(false);
  const [addComment, setAddComment] = useState<boolean>(false);
  const [inputDefaultValue, updateInputDefaultValue] = useState<string>("");
  const [newComment, setNewComment] = useState<IComment>({
    project_id: task.project_id,
    category_id: task.category_id,
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
  }
  function postComment() {
    if (newComment.content.length > 0) {
      dispatch(actionCreators.addComment(newComment));
      updateNewComment("content", "");
    }
  }

  const renderComment =
    (offset: number) =>
    (item: IComment): ReactNode => {
      console.log(offset);
      return (
        <>
          <div
            key={item.comment_id}
            className={cn("comment-section__sub-comment")}
          >
            {new Array(offset).fill("--").join("")}
            {item.content}
          </div>
          <Button title={"Дополнить"} />
          {item.sub_comments?.map(renderComment(offset + 1))}
        </>
      );
    };
  // useEffect(() => {
  //   console.log(newComment);
  // }, [newComment]);

  return (
    <div className={cn("comment-section")}>
      <div>Комментарии</div>
      {task.comments.map((item) => (
        <>
          <div key={item.comment_id} className={cn("comment-section__comment")}>
            <div
              className={cn("comment-section__comment__content")}
              key={item.comment_id}
            >
              {item.content}
            </div>
            {!addSubComment && (
              <Button
                title={"+ Ответить"}
                click={() => setAddSubComment(!addSubComment)}
              />
            )}
          </div>

          {renderComment(0)(item)}

          {/* {item.sub_comments?.map((sub_comment) => (
            <>
              <div
                key={sub_comment.sub_comment_id}
                className={cn("comment-section__sub-comment")}
              >
                {sub_comment.content}
              </div>
            </>
          ))} */}

          {addSubComment && (
            <div className={cn("comment-section__add-sub-comment")}>
              <Input
                id={"subtask-add"}
                type={"text"}
                placeholder={"Дополните комментарий..."}
                defaultValue={newComment.content}
                className="input"
                // onchange={(e) => updateNewCommentContent(e.target.value)}
              />
              <Button title={"Дополнить"} />
            </div>
          )}
        </>
      ))}

      <div>
        {!addComment && (
          <Button
            title={"+ Добавить комментарий"}
            click={() => setAddComment(!addComment)}
          />
        )}
        {addComment && (
          <div className={cn("comment-section__add-comment")}>
            {" "}
            <Input
              id={"comment"}
              type={"text"}
              placeholder={"Оставьте комментарий..."}
              className="input"
              defaultValue={newComment.content}
              onchange={(e) => updateNewComment("content", e.target.value)}
            />
            <Button title={"Опубликовать"} click={() => postComment()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
