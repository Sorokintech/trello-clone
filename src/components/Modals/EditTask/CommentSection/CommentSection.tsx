import React, { FC, ReactNode, useEffect, useState } from "react";
import cn from "classnames";

import "./CommentSection.scss";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import CommentLightIcon from "../../../../assets/images/comment-icon-light.png";
import CommentDarkIcon from "../../../../assets/images/comment-icon-dark.png";
import CommentAcceptDarkIcon from "../../../../assets/images/comment-accept-icon-dark.png";
import { IComment } from "../../../../assets/types/types";
import { actionCreators, State } from "../../../../store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { defaultComment } from "../../../../assets/data/mockDefaultData";

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
  // const commentsAmount = task.comments.length;
  // const [addSubComment, setAddSubComment] = useState<boolean>(false);
  const [addComment, setAddComment] = useState<boolean>(false);
  const [selectedComment, setSelectedComment] = useState<String>("");
  const [newComment, setNewComment] = useState<IComment>(defaultComment);

  const dispatch = useDispatch();
  function updateNewComment(
    key: string,
    value: string,
    parent_id: string | null
  ) {
    setNewComment((prevState) => ({
      ...prevState,
      [key]: value,
      project_id: task.project_id,
      category_id: task.category_id,
      task_id: task.task_id,
      parent_id,
      comment_id: format(new Date(), "dd.MM.yyyy HH:mm:ss"),
    }));
  }

  function postComment() {
    if (newComment.content.length > 0) {
      // setAddComment(!addComment);
      dispatch(actionCreators.addComment(newComment));
      updateNewComment("content", "", null);
      setAddComment(!addComment);
    }
  }

  function RenderCommentInput(comment_id: string) {
    if (comment_id === selectedComment) {
      setAddComment(!addComment);
    } else {
      setSelectedComment(comment_id);
      setAddComment(true);
    }
  }

  const renderComment =
    (offset: number) =>
    (item: IComment): ReactNode => {
      // console.log(offset);
      // console.log(item);
      const commentStyle = {
        marginLeft: `${offset * 1}rem`,
      };
      return (
        <>
          <div
            key={item.comment_id}
            className={cn("comment-section__sub-comment")}
            style={commentStyle}
          >
            {item.content}
            <img
              className={cn("comment-section__sub-comment__icon")}
              src={CommentDarkIcon}
              alt="comment-icon"
              onClick={() => RenderCommentInput(item.comment_id)}
            />
          </div>
          {item.comment_id === selectedComment && addComment && (
            <div className={cn("comment-section__add-comment")}>
              <Input
                id={"subtask-add"}
                type={"text"}
                placeholder={"Дополните комментарий..."}
                defaultValue={newComment.content}
                className="input"
                onchange={(e) =>
                  updateNewComment("content", e.target.value, item.comment_id)
                }
              />
              <img
                className={cn("comment-section__add-comment__icon")}
                src={CommentAcceptDarkIcon}
                alt="comment-icon"
                onClick={() => postComment()}
                // onClick={() => RenderCommentInput(item.comment_id)}
              />
            </div>
          )}
          {item.comments?.map(renderComment(offset + 1))}
        </>
      );
    };
  // useEffect(() => {
  //   console.log(task);
  // }, [newComment]);

  return (
    <div className={cn("comment-section")} key={task_id}>
      <div className={cn("comment-section__header")}>Комментарии</div>
      {task.comments.map((item) => (
        <>
          <div key={item.comment_id} className={cn("comment-section__comment")}>
            <>
              <div
                className={cn("comment-section__comment__content")}
                key={item.comment_id}
              >
                {item.content}
                <img
                  className={cn("comment-section__comment__icon")}
                  src={CommentLightIcon}
                  alt="comment-icon"
                  onClick={() => RenderCommentInput(item.comment_id)}
                />
              </div>
            </>
            <>
              {item.comment_id === selectedComment && addComment && (
                <div
                  className={cn("comment-section__add-comment")}
                  key={item.comment_id}
                >
                  <Input
                    id={"subtask-add"}
                    type={"text"}
                    placeholder={"Дополните комментарий..."}
                    defaultValue={newComment.content}
                    className="input"
                    onchange={(e) =>
                      updateNewComment(
                        "content",
                        e.target.value,
                        item.comment_id
                      )
                    }
                  />
                  <img
                    className={cn("comment-section__add-comment__icon")}
                    src={CommentAcceptDarkIcon}
                    alt="comment-icon"
                    onClick={() => postComment()}
                    // onClick={() => RenderCommentInput(item.comment_id)}
                  />
                </div>
              )}
            </>
          </div>
          {item.comments?.map((item) => renderComment(0)(item))}
        </>
      ))}

      <div className={cn("comment-wrapper")}>
        <Button
          title={"+ Добавить комментарий"}
          // click={() => setAddComment(!addComment)}
          click={() => RenderCommentInput(task.task_id)}
        />
        {addComment && selectedComment === task.task_id && (
          <div className={cn("comment-section__add-comment")}>
            {" "}
            <Input
              id={"comment"}
              type={"text"}
              placeholder={"Оставьте комментарий..."}
              className="input"
              defaultValue={newComment.content}
              onchange={(e) =>
                updateNewComment("content", e.target.value, null)
              }
            />
            <img
              className={cn("comment-section__add-comment__icon")}
              src={CommentAcceptDarkIcon}
              alt="comment-icon"
              onClick={() => postComment()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
