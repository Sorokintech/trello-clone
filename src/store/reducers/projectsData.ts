import { IProject } from "../../assets/types/types";
import { ActionType } from "../action-types";
import { ISetProjectData, IAddComment, IAddTask } from "../actions/index";

const initialState: IProject[] = [];

const projectsDataReducer = (
  state = initialState,
  action: ISetProjectData | IAddComment | IAddTask
) => {
  switch (action.type) {
    case ActionType.setProjectsData:
      const data = action.payload;
      return [...data];
    // ADD COMMENT
    case ActionType.addComment:
      const comment = action.payload;
      return state.map((project) => {
        if (project.project_id === comment.project_id) {
          const task = project.tasks.find(
            (task) => task.task_id === comment.task_id
          );
          if (task) {
            const updatedTask = {
              ...task,
              comments: [...task.comments, comment],
            };

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
    // ADD TASK
    case ActionType.addTask:
      const task = action.payload;
      return state.map((project) => {
        if (project.project_id === task.project_id) {
          return {
            ...project,
            tasks: [...project.tasks, task],
          };
        }
        return project;
      });

    default:
      return state;
  }
};
export default projectsDataReducer;
