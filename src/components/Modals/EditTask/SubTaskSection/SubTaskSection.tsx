import React, { FC, useState } from "react";
import cn from "classnames";

import "./SubTaskSection.scss";
import { ITask } from "../../../../assets/types/types";
import Button from "../../../Inputs/Button/Button";
import Input from "../../../Inputs/Input/Input";

const SubTaskSection: FC<ITask> = ({ ...currentTask }) => {
  const [subTask, updateSubTask] = useState<string>("");
  const [taskDone, setTaskDone] = useState<boolean>(false);
  const [addSubTask, setAddSubTask] = useState<boolean>(false);
  function addSubTaskHandler() {
    if (subTask.length > 1) {
      console.log(subTask);
      setAddSubTask(false);
      updateSubTask("");
    }
  }
  return (
    <div className={cn("task-modal__sub-task-section")}>
      <Button
        title={"+ Добавить подзадачу"}
        className={"button-light-blue"}
        click={() => setAddSubTask(true)}
      />
      {addSubTask && (
        <div className={cn("task-modal__sub-task-section__add-subtask")}>
          <Input
            id={"subtask-add"}
            type={"text"}
            placeholder={"Добавьте описание..."}
            defaultV={subTask}
            onchange={(e) => updateSubTask(e.target.value)}
          />
          <Button
            title={"Добавить"}
            className={"button-light-blue"}
            // click={addSubTaskHandler}
          />
        </div>
      )}
      {currentTask.subtasks.map((item) => (
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
