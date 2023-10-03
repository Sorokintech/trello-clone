import React, { FC, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import cn from "classnames";
import "./TaskColumn.scss";
import Task from "../Task/Task";

const MockColumnData = [
  {
    category: "dev",
    task_id: "1",
    task_number: "1",
    title: "Локализировать проблему",
    priority: "Средний",
    createDate: "30.09.2023",
    devTime: "3 часа",
    endDate: "В работе",
    status: "В работе",
  },
  {
    category: "dev",
    task_id: "2",
    task_number: "3",
    title: "Кукусить пору",
    priority: "Средний",
    createDate: "30.09.2023",
    devTime: "2 часа",
    endDate: "В работе",
    status: "В работе",
  },
  {
    category: "done",
    task_id: "1",
    task_number: "2",
    title: "Приготовить готовое",
    priority: "Средний",
    createDate: "30.09.2023",
    devTime: "4 часа",
    endDate: "30.09.2023",
    status: "Выполнено",
  },
  {
    category: "done",
    task_id: "2",
    task_number: "5",
    title: "Покушать макару",
    priority: "Средний",
    createDate: "30.09.2023",
    devTime: "2 часа",
    endDate: "30.09.2023",
    status: "Выполнено",
  },
  {
    category: "done",
    task_id: "3",
    task_number: "4",
    title: "Включить бубан",
    priority: "Средний",
    createDate: "30.09.2023",
    devTime: "2 часа",
    endDate: "30.09.2023",
    status: "Выполнено",
  },
  {
    category: "queue",
    task_id: "1",
    task_number: "6",
    title: "Завести газ",
    priority: "Средний",
    createDate: "30.09.2023",
    devTime: "0",
    endDate: "В очереди",
    status: "В очереди",
  },
];
interface ITaskColumn {
  title: string;
  id: string;
}

const TaskColumn: FC<ITaskColumn> = ({ title, id }) => {
  const ColumnTasks = MockColumnData.filter((el) => el.category === id);
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
        {column.map((i, index) => (
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
