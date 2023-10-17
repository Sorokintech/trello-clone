import React, { FC, useCallback, useEffect, useState } from "react";
import cn from "classnames";

// import saveIcon from "../../../../assets/images/save-icon.png";

import "./SubTaskSection.scss";
import { ISubTask, ITask } from "../../../../assets/types/types";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State, actionCreators } from "../../../../store";
import { format } from "date-fns";
import TextEditor from "../../../Inputs/TextEditor/TextEditor";
import { defaultSubTask } from "../../../../assets/data/mockDefaultData";
import isThisMinute from "date-fns/isThisMinute/index";

const SubTaskSection: FC<{ task_id: string }> = ({ task_id }) => {
  const { project_id } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state: State) => state.projectData);

  // Redux data extract
  const task = state
    .filter((el) => el.project_id === project_id)[0]
    .tasks.filter((task) => task.task_id === task_id)[0];
  const subTaskAmount = task.subtasks.length;

  // Use State
  const [taskDone, setTaskDone] = useState<boolean>(false);
  const [inputShown, setInputShown] = useState<boolean>(false);
  const [newSubTask, setNewSubTask] = useState<ISubTask>(defaultSubTask);
  const [updatedSubTask, setUpdatedSubTask] =
    useState<ISubTask>(defaultSubTask);

  // Function that updates the new subtask
  function updateNewSubTask(
    key: string,
    value: string,
    project_id: string | undefined,
    task_id: string
  ) {
    let date = new Date();
    setNewSubTask((prevState) => ({
      ...prevState,
      [key]: value,
      createDate: format(date, "dd.MM.yyyy"),
      subtask_id: (subTaskAmount + 1).toString(),
      project_id: project_id,
      task_id: task_id,
    }));
  }

  // Function that dispatches the new subtask to redux
  function addSubTask() {
    if (newSubTask.content.length > 1) {
      dispatch(actionCreators.addSubTask(newSubTask));
      updateNewSubTask("content", "", task.project_id, task.task_id);
      setInputShown(false);
    }
  }
  // Function that updates the existing subtask
  const updateSubTask = useCallback(
    (
      key: string,
      value: string,
      isDone: boolean,
      endDate: string | boolean,
      item: ISubTask
    ) => {
      let date: string | boolean;
      endDate ? (date = format(new Date(), "dd.MM.yyyy")) : (date = false);
      const newUpdatedSubTask = {
        ...item,
        [key]: value,
        subtask_id: item.subtask_id,
        endDate: date,
        done: isDone,
      };
      setUpdatedSubTask(newUpdatedSubTask);
      if (isDone !== item.done) {
        console.log(newUpdatedSubTask);
        console.log(item);
        dispatch(actionCreators.updateSubTask(newUpdatedSubTask));
      }
    },
    []
  );

  // UseEffect dispatches the updatedTask to redux once the subtask is done/undone
  // useEffect(() => {
  //   if (
  //     updatedSubTask.done !==
  //     task?.subtasks.filter(
  //       (item) => item.subtask_id === updatedSubTask.subtask_id
  //     )[0]?.done
  //   )
  //     dispatch(actionCreators.updateSubTask(updatedSubTask));
  // }, [updatedSubTask]);

  return (
    <div className={cn("sub-task-section")}>
      <div className={cn("sub-task-section__header")}>Текущие подзадачи</div>
      {!inputShown && (
        <Button
          title={"+ Добавить подзадачу"}
          click={() => setInputShown(true)}
        />
      )}
      {inputShown && (
        <div className={cn("sub-task-section__add-subtask")}>
          <div className={cn("sub-task-section__add-subtask__editor")}>
            <TextEditor
              id={"subtask-add"}
              defaultValue={""}
              onchange={(a, editor) => {
                updateNewSubTask(
                  "content",
                  editor.getContent({ format: "html" }),
                  task.project_id,
                  task.task_id
                );
              }}
            />
          </div>
          <Button title={"Добавить"} click={() => addSubTask()} />
        </div>
      )}

      {task.subtasks
        .sort((a, b) => +b.subtask_id - +a.subtask_id)
        .map((item) => (
          <>
            <div key={item.content} className={cn("sub-task-section__item")}>
              <div className={cn("sub-task-section__item__editor")}>
                <TextEditor
                  project_id={item.project_id}
                  task_id={item.task_id}
                  subtask_id={item.subtask_id}
                  id={item.subtask_id}
                  defaultValue={item.content}
                  createDate={item.createDate}
                  done={item.done}
                  onchange={(a, editor) => {
                    updateSubTask(
                      "content",
                      editor.getContent({ format: "html" }),
                      false,
                      false,
                      item
                    );
                    setInputShown(false);
                  }}
                />
              </div>

              {item.subtask_id === updatedSubTask.subtask_id &&
              updatedSubTask.content !== item.content ? (
                <Button
                  title={"✎"}
                  className={"button__icon"}
                  click={() =>
                    dispatch(actionCreators.updateSubTask(updatedSubTask))
                  }
                />
              ) : (
                <Button
                  title={!item.endDate ? "☑" : "↺"}
                  className={"button__icon"}
                  click={() => {
                    updateSubTask(
                      "content",
                      item.content,
                      !item.endDate ? true : false,
                      !item.endDate ? true : false,
                      item
                    );
                  }}
                />
              )}
            </div>
          </>
        ))}
    </div>
  );
};

export default SubTaskSection;
