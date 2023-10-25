import { ICategory, IComment, IProject } from "../../assets/types/types";
import { updateCategories } from "../action-creators";
import { ActionType } from "../action-types";
import {
  ISetProjectData,
  IAddComment,
  IAddTask,
  IUpdateTask,
  IAddSubTask,
  IUpdateSubTask,
  IAddSubComment,
  IUpdateCategories,
  IMoveTaskTo,
  IMoveTaskFrom,
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
    | IUpdateCategories
    | IMoveTaskTo
    | IMoveTaskFrom
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
    //Move
    case ActionType.moveTaskTo:
      const item = action.payload;
      return state.map((project) => {
        if (project.project_id === item.project_id) {
          return {
            ...project,
            categories: project.categories.map((category) => {
              if (category.category_id === item.category_id) {
                return {
                  ...category,
                  tasks: [...category.tasks, item],
                };
              }
              return category;
            }),
          };
        }
        return project;
      });
    //Move
    case ActionType.moveTaskFrom:
      const loseItem = action.payload;
      return state.map((project) => {
        if (project.project_id === loseItem.project_id) {
          return {
            ...project,
            categories: project.categories.map((category) => {
              if (category.category_id === loseItem.category_id) {
                const copiedTasks = [
                  ...category.tasks.filter(
                    (i) => i.task_id !== loseItem.task_id
                  ),
                ];
                return {
                  ...category,
                  tasks: [...copiedTasks],
                };
              }
              return category;
            }),
          };
        }
        return project;
      });

    // UPDATE CATEGORIES
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

    // UPDATE TASK
    case ActionType.updateCategories:
      const updatedCategories = action.payload;

      return state.map((project) => {
        if (project.project_id === updatedCategories[0].project_id) {
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
      const updateComment = (
        comments: IComment[],
        comment: IComment
      ): IComment[] => {
        if (comment.parent_id === null) {
          comments.push(comment);
          return comments;
        }
        for (let i = 0; i < comments.length; i++) {
          debugger;
          if (comments[i].comment_id === comment.parent_id) {
            comments[i].comments = [...comments[i].comments!, comment];
            return [...comments];
          } else {
            comments[i].comments! = updateComment(
              [...comments[i].comments!],
              comment
            );
          }
        }
        return comments;
      };
      return state.map((project) => {
        if (project.project_id === comment.project_id) {
          const updatedCategories = project.categories.map((category) => {
            const updatedTasks = category.tasks.map((task) => {
              if (task.task_id === comment.task_id) {
                return {
                  ...task,
                  // comments: [...task.comments, comment],
                  comments: updateComment([...task.comments], comment),
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
