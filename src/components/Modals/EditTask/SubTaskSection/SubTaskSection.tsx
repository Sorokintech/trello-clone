import React, { FC, useState } from "react";
import cn from "classnames";

import "./SubTaskSection.scss";
import { ISubTask, ITask } from "../../../../assets/types/types";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { State, actionCreators } from "../../../../store";
import { format, compareAsc } from "date-fns";

const SubTaskSection: FC<{ task_id: string }> = ({ task_id }) => {
  const { project_id } = useParams();
  const state = useSelector((state: State) => state.projectData);
  const task = state
    .filter((el) => el.project_id === project_id)[0]
    .tasks.filter((task) => task.task_id === task_id)[0];
  const subTaskAmount = task.subtasks.length;
  const [subTask, updateSubTask] = useState<ISubTask>({
    project_id: task.project_id,
    task_id: task.task_id,
    subtask_id: "",
    content: "",
    createDate: "",
    done: false,
  });
  const dispatch = useDispatch();
  const [taskDone, setTaskDone] = useState<boolean>(false);
  const [inputShown, setInputShown] = useState<boolean>(false);

  function fixSubTask(key: string, value: string) {
    let date = new Date();
    updateSubTask((prevState) => ({
      ...prevState,
      [key]: value,
      createDate: format(date, "HH:mm"),
      subtask_id: (subTaskAmount + 1).toString(),
    }));
  }

  function addSubTask() {
    if (subTask.content.length > 1) {
      dispatch(actionCreators.addSubTask(subTask));
      fixSubTask("content", "");
      setInputShown(false);
    }
  } // надо подумать как делать update, при введение значений в input кнопка то все еще 'выполнено'

  return (
    <div className={cn("task-modal__sub-task-section")}>
      <Button
        title={"+ Добавить подзадачу"}
        className={"button-light-blue"}
        click={() => setInputShown(true)}
      />
      {inputShown && (
        <div className={cn("task-modal__sub-task-section__add-subtask")}>
          <Input
            id={"subtask-add"}
            type={"text"}
            placeholder={"Добавьте описание..."}
            defaultV={""}
            onchange={(e) => fixSubTask("content", e.target.value)}
          />
          <Button
            title={"Добавить"}
            className={"button-light-blue"}
            click={() => addSubTask()}
          />
        </div>
      )}
      {task.subtasks.map((item) => (
        <div
          key={item.subtask_id}
          className={cn("task-modal__sub-task-section__item")}
        >
          <Input
            id={item.subtask_id}
            type={"text"}
            defaultV={item.content}
            className={cn(item.done ? "input-subtask-done" : "input-subtask")}
            // onchange={(e) => updateSubTask(e.target.value)}
          />
          <Button title={"Выполнено"} className={"button-light-blue"} />
        </div>
      ))}
    </div>
  );
};

export default SubTaskSection;
