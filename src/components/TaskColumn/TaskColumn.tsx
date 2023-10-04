import React, { FC, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import cn from "classnames";
import "./TaskColumn.scss";
import Task from "../Task/Task";
import { useSelector } from "react-redux";
import { actionCreators, State } from "../../store";

interface ITaskColumn {
  title: string;
  id: string;
}

const TaskColumn: FC<ITaskColumn> = ({ title, id }) => {
  // const ColumnTasks = MockColumnData.filter((el) => el.category === id);
  const state = useSelector((state: State) => state.projectData[1]);
  console.log(state);
  const ColumnTasks = state.tasks.filter((el) => el.category === id);
  const [column, updateColumn] = useState(ColumnTasks);

  // function handleOnDragEnd(result: any) {
  //   console.log(result);
  //   if (!result.destination) return;
  //   const items = column;
  //   const [reorderedItem] = column.splice(result.source.index, 1);
  //   items.splice(result.destination.index, 0, reorderedItem);

  //   updateColumn(items);
  // }
  return (
    <div className={cn("task-column")}>
      <h4 className={cn("task-column__header")}>{title}</h4>
      <div className={cn("task-column__content")}>
        {column.map((i) => (
          <Task {...i} />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;

// <DragDropContext onDragEnd={handleOnDragEnd}>
// <div className={cn("task-column")}>
//   <h4 className={cn("task-column__header")}>{title}</h4>
//   <Droppable droppableId={title}>
//     {(provided) => (
//       <div
//         className={cn("task-column__content")}
//         {...provided.droppableProps}
//         ref={provided.innerRef}
//       >
//         {column.map((i, index) => (
//           <Draggable
//             draggableId={i.task_id}
//             key={i.task_id}
//             index={index}
//           >
//             {(provided) => (
//               <div
//                 {...provided.draggableProps}
//                 {...provided.dragHandleProps}
//                 ref={provided.innerRef}
//               >
//                 <Task {...i} />
//               </div>
//             )}
//           </Draggable>
//         ))}
//         {provided.placeholder}
//       </div>
//     )}
//   </Droppable>
// </div>
// </DragDropContext>
