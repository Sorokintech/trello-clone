import { IProject } from "../../assets/types/types";
import { ActionType } from "../action-types";
import { ISetProjectData, IAddComment } from "../actions/index";

const initialState: IProject[] = [];

const projectsDataReducer = (
  state = initialState,
  action: ISetProjectData | IAddComment
) => {
  switch (action.type) {
    case ActionType.setProjectsData:
      const data = action.payload;
      return [...data];
    case ActionType.addComment:
      const comment = action.payload;
      return state.map((project) => {
        if (project.projectId === comment.projectId) {
          // Найдите задачу с соответствующим ID
          console.log("ok");
          const task = project.tasks.find(
            (task) => task.task_id === comment.taskId
          );

          if (task) {
            // Обновите свойство comments в задаче
            const updatedTask = {
              ...task,
              comments: [...task.comments, comment],
            };
            // Обновите массив задач в проекте и верните обновленный проект
            return {
              ...project,
              tasks: project.tasks.map((t) =>
                t.task_id === updatedTask.task_id ? updatedTask : t
              ),
            };
          }
        }
        return project;
      });

    default:
      return state;
  }
};
export default projectsDataReducer;
