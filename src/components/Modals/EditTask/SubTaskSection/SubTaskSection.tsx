import React, { Children, FC, useEffect, useState } from "react";
import cn from "classnames";

// import saveIcon from "../../../../assets/images/save-icon.png";

import "./SubTaskSection.scss";
import { ISubTask } from "../../../../assets/types/types";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State, actionCreators } from "../../../../store";
import { format } from "date-fns";
import TextEditor from "../../../Inputs/TextEditor/TextEditor";

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
  const [newSubTask, setNewSubTask] = useState<ISubTask>({
    project_id: task.project_id,
    task_id: task.task_id,
    subtask_id: "",
    content: "",
    createDate: "",
    done: false,
  });
  const [updatedSubTask, setUpdatedSubTask] = useState<ISubTask>({
    project_id: task.project_id,
    task_id: task.task_id,
    subtask_id: "",
    content: "",
    createDate: "",
    done: false,
  });
  // Function that updates the new sub-task
  function updateNewSubTask(key: string, value: string) {
    let date = new Date();
    setNewSubTask((prevState) => ({
      ...prevState,
      [key]: value,
      createDate: format(date, "dd.MM.yyyy"),
      subtask_id: (subTaskAmount + 1).toString(),
    }));
  }

  // Function that dispatches the subtask to redux
  function addSubTask() {
    if (newSubTask.content.length > 1) {
      dispatch(actionCreators.addSubTask(newSubTask));
      updateNewSubTask("content", "");
      setInputShown(false);
    }
  }
  // Function that updates the specific sub-task
  async function updateSubTask(
    key: string,
    value: string,
    date: string | undefined,
    subtask_id: string,
    isDone: boolean
  ) {
    setUpdatedSubTask((prevState) => ({
      ...prevState,
      [key]: value,
      createDate: date,
      subtask_id: subtask_id,
      done: isDone,
    }));
  }
  // Function that dispatches the subtask to redux
  function dispatchUpdatedSubTask() {
    dispatch(actionCreators.updateSubTask(updatedSubTask));
  }
  // function subTaskDoneToggleHandler() {
  //   dispatch(actionCreators.updateSubTask(updatedSubTask));
  // }
  useEffect(() => {
    console.log(state[0].tasks);
  }, [state]);

  return (
    <div className={cn("sub-task-section")}>
      <div className={cn("sub-task-section__header")}>Текущие подзадачи</div>
      <Button
        title={"+ Добавить подзадачу"}
        click={() => setInputShown(true)}
      />
      {inputShown && (
        <div className={cn("sub-task-section__add-subtask")}>
          <div className={cn("sub-task-section__add-subtask__editor")}>
            <TextEditor
              id={"subtask-add"}
              defaultValue={""}
              onchange={(a, editor) => {
                updateNewSubTask(
                  "content",
                  editor.getContent({ format: "html" })
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
                  id={item.subtask_id}
                  defaultValue={item.content}
                  createDate={item.createDate}
                  done={item.done}
                  onchange={(a, editor) => {
                    updateSubTask(
                      "content",
                      editor.getContent({ format: "html" }),
                      item.createDate,
                      item.subtask_id,
                      false
                    );
                  }}
                />
              </div>
              {item.subtask_id === updatedSubTask.subtask_id &&
              updatedSubTask.content !== item.content ? (
                <Button
                  title={"✎"}
                  className={"button-subtasks"}
                  click={() =>
                    dispatch(actionCreators.updateSubTask(updatedSubTask))
                  }
                />
              ) : (
                <Button
                  title={"☑"}
                  className={"button-subtasks"}
                  click={async () => {
                    await updateSubTask(
                      "content",
                      item.content,
                      item.createDate,
                      item.subtask_id,
                      true
                    ).then(() => {
                      console.log(updatedSubTask);
                      dispatch(actionCreators.updateSubTask(updatedSubTask));
                    });
                  }}
                />
              )}
            </div>
            {/* {item.content !== updatedSubTask.content && (
              <div className={cn("sub-task-section__save-btn")}>
                <Button
                  title={"Сохранить изменения"}
                  className={"small"}
                  // click={() => }
                />
              </div>
            )} */}
          </>
        ))}
    </div>
  );
};

export default SubTaskSection;
