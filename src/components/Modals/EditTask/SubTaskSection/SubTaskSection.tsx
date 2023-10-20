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

const SubTaskSection: FC<{
  task_id: string;
  category_id: string | undefined;
}> = ({ task_id, category_id }) => {
  const { project_id } = useParams();
  const dispatch = useDispatch();

  const state = useSelector((state: State) => state.projectData);

  // Redux data extract
  const task = state
    .filter((el) => el.project_id === project_id)[0]
    .categories.filter((category) => category.category_id === category_id)[0]
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
    setNewSubTask((prevState) => ({
      ...prevState,
      [key]: value,
      project_id: project_id,
      category_id: category_id,
      task_id: task_id,
      subtask_id: format(new Date(), "dd.MM.yyyy HH:mm:ss"),
      subtask_number: (subTaskAmount + 1).toString(),
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
  console.log(format(new Date(), "dd.MM.yyyy HH:mm:ss"));
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
      endDate
        ? (date = format(new Date(), "dd.MM.yyyy HH:mm:ss"))
        : (date = false);
      const newUpdatedSubTask = {
        ...item,
        [key]: value,
        subtask_id: item.subtask_id,
        endDate: date,
        done: isDone,
      };
      setUpdatedSubTask(newUpdatedSubTask);
      if (isDone !== item.done) {
        // console.log(newUpdatedSubTask);
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
              subtask_number={(subTaskAmount + 1).toString()}
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
            <div key={item.subtask_id} className={cn("sub-task-section__item")}>
              <div className={cn("sub-task-section__item__editor")}>
                <TextEditor
                  project_id={item.project_id}
                  task_id={item.task_id}
                  category_id={item.category_id}
                  subtask_id={item.subtask_id}
                  subtask_number={item.subtask_number}
                  defaultValue={item.content}
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
