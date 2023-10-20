import { ICategory, IComment, IProject } from "../../assets/types/types";
import { ActionType } from "../action-types";
import {
  ISetProjectData,
  IAddComment,
  IAddTask,
  IUpdateTask,
  IAddSubTask,
  IUpdateSubTask,
  IAddSubComment,
} from "../actions/index";

// const addCommentToComments = (comments: IAddComment[], comment: IAddComment) => {
//   if (comment.parent_id === null) {
//     // Если parent_id равен null, добавляем комментарий в массив comments
//     return [...comments, comment];
//   } else {
//     // Если parent_id не равен null, находим родительский комментарий по parent_id и добавляем комментарий в его массив comments
//     return comments.map((c) => {
//       if (c.comment_id === comment.parent_id) {
//         return {
//           ...c,
//           comments: addCommentToComments(c.comments, comment),
//         };
//       }
//       return c;
//     });
//   }
// };

const initialState: IProject[] = [];

const projectsDataReducer = (
  state = initialState,
  action:
    | ISetProjectData
    | IAddComment
    | IAddSubComment
    | IAddTask
    | IUpdateTask
    | IUpdateTask
    | IAddSubTask
    | IUpdateSubTask
) => {
  switch (action.type) {
    // Initiate state
    case ActionType.setProjectsData:
      const data = action.payload;
      return [...data];
    // ADD TASK
    case ActionType.addTask:
      const task = action.payload;
      return state.map((project) => {
        if (project.project_id === task.project_id) {
          return {
            ...project,
            categories: project.categories.map((category) => {
              if (category.category_id === task.category_id) {
                return {
                  ...category,
                  tasks: [...category.tasks, task],
                };
              }
              return category;
            }),
          };
        }
        return project;
      });

    // UPDATE TASK
    case ActionType.updateTask:
      const updatedTask = action.payload;
      return state.map((project) => {
        if (project.project_id === updatedTask.project_id) {
          const updatedCategories = project.categories.map((category) => {
            const updatedTasks = category.tasks.map((task) => {
              if (task.task_id === updatedTask.task_id) {
                return { ...task, ...updatedTask };
              }
              return task;
            });
            return { ...category, tasks: updatedTasks };
          });
          return { ...project, categories: updatedCategories };
        }
        return project;
      });
    // ADD SUBTASK
    case ActionType.addSubTask:
      const subtask = action.payload;
      return state.map((project) => {
        if (project.project_id === subtask.project_id) {
          const updatedCategories = project.categories.map((category) => {
            const updatedTasks = category.tasks.map((task) => {
              if (task.task_id === subtask.task_id) {
                return {
                  ...task,
                  subtasks: [...task.subtasks, subtask],
                };
              }
              return task;
            });
            return {
              ...category,
              tasks: updatedTasks,
            };
          });
          return {
            ...project,
            categories: updatedCategories,
          };
        }
        return project;
      });
    // UPDATE SUBTASK
    case ActionType.updateSubTask:
      const updatedSubTask = action.payload;
      return state.map((project) => {
        if (project.project_id === updatedSubTask.project_id) {
          const updatedCategories = project.categories.map((category) => {
            const updatedTasks = category.tasks.map((task) => {
              if (task.task_id === updatedSubTask.task_id) {
                const updatedSubtasks = task.subtasks.map((subtask) => {
                  if (subtask.subtask_id === updatedSubTask.subtask_id) {
                    return {
                      ...subtask,
                      ...updatedSubTask,
                    };
                  }
                  return subtask;
                });
                return {
                  ...task,
                  subtasks: updatedSubtasks,
                };
              }
              return task;
            });
            return {
              ...category,
              tasks: updatedTasks,
            };
          });
          return {
            ...project,
            categories: updatedCategories,
          };
        }
        return project;
      });
    // ADD COMMENT

    case ActionType.addComment:
      const comment = action.payload;
      return state.map((project) => {
        if (project.project_id === comment.project_id) {
          const updatedCategories = project.categories.map((category) => {
            const updatedTasks = category.tasks.map((task) => {
              if (task.task_id === comment.task_id) {
                return {
                  ...task,
                  comments: [...task.comments, comment],
                };
              }
              return task;
            });
            return {
              ...category,
              tasks: updatedTasks,
            };
          });
          return {
            ...project,
            categories: updatedCategories,
          };
        }
        return project;
      });

    // case ActionType.addComment:
    // const comment = action.payload;
    // return state.map((project) => {
    //   if (project.project_id === comment.project_id) {
    //     const updatedCategories = project.categories.map((category) => {
    //       const updatedTasks = category.tasks.map((task) => {
    //         if (task.task_id === comment.parent_id) {
    //           return {
    //             ...task,
    //             comments: [...task.comments, comment],
    //           };
    //         } else {
    //           const updatedComments = task.comments.map((c) => {
    //             if (c.comment_id === comment.parent_id) {
    //               return {
    //                 ...c,
    //                 comments: [...c.comments, comment],
    //               };
    //             }
    //             return c;
    //           });
    //           return {
    //             ...task,
    //             comments: updatedComments,
    //           };
    //         }
    //       });
    //       return {
    //         ...category,
    //         tasks: updatedTasks,
    //       };
    //     });
    //     return {
    //       ...project,
    //       categories: updatedCategories,
    //     };
    //   }
    //   return project;
    // });
    default:
      return state;
  }
};
export default projectsDataReducer;
