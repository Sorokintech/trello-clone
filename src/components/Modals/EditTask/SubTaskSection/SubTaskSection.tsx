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
  function updateSubTask(
    key: string,
    value: string | boolean,
    date: string | undefined,
    subtask_id: string
  ) {
    setUpdatedSubTask((prevState) => ({
      ...prevState,
      [key]: value,
      createDate: date,
      subtask_id: subtask_id,
    }));
  }
  // Function that dispatches the subtask to redux
  function dispatchUpdatedSubTask() {
    dispatch(actionCreators.updateSubTask(updatedSubTask));
  }
  // function subTaskDoneToggleHandler(
  //   key: string,
  //   value: string | boolean,
  //   date: string | undefined,
  //   subtask_id: string
  // ) {
  //   updateSubTask(key, value, date, subtask_id);
  //   dispatch(actionCreators.updateSubTask(updatedSubTask));
  //   console.log("toggled");
  // }
  useEffect(() => {
    console.log(state[0]);
  }, [state]);

  return (
    <div className={cn("sub-task-section")}>
      <Button
        title={"+ Добавить подзадачу"}
        click={() => setInputShown(true)}
      />
      {inputShown && (
        <div className={cn("sub-task-section__add-subtask")}>
          <Input
            id={"subtask-add"}
            type={"text"}
            placeholder={"Добавьте описание..."}
            defaultV={""}
            onchange={(e) => updateNewSubTask("content", e.target.value)}
          />
          <Button title={"Добавить"} click={() => addSubTask()} />
        </div>
      )}
      {task.subtasks
        .sort((a, b) => +b.subtask_id - +a.subtask_id)
        .map((item) => (
          <div key={item.subtask_id} className={cn("sub-task-section__item")}>
            <Input
              id={item.subtask_id}
              type={"textarea"}
              defaultV={item.content}
              createDate={item.createDate}
              className={cn(item.done ? "input-subtask-done" : "input-subtask")}
              onchange={(e) =>
                updateSubTask(
                  "content",
                  e.target.value,
                  item.createDate,
                  item.subtask_id
                )
              }
            />
            <Button
              title={"Выполнено"}
              className={"button-subtask"}
              // click={() =>
              //   subTaskDoneToggleHandler(
              //     "done",
              //     true,
              //     item.createDate,
              //     item.subtask_id
              //   )
              // }
            />
            {/* <img
            className={cn(
              "sub-task-section__save-icon-default"
              // "sub-task-section__save-icon-shown"
            )}
            src={saveIcon}
            alt="save_icon"
            onClick={() => dispatchUpdatedSubTask()}
          /> */}
            {/* <Button title={"Выполнено"} className={"button-light-blue"} /> */}
          </div>
        ))}
    </div>
  );
};

export default SubTaskSection;
