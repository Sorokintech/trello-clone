export const mockProjectsData = [
  {
    title: "Project Alpha",
    project_id: "1",
    tasks: [
      {
        project_id: "1",
        category: "dev",
        task_id: "1",
        task_number: "1",
        title: "Купить корм",
        description:
          "Купить корм коту, обязательно премиальный, он другого у него газы",
        priority: "Средний",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "3",
        endDate: "В работе",
        status: "В работе",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "1",
        category: "dev",
        task_id: "3",
        task_number: "3",
        title: "Продать Диван",
        description: "Срочно продать диван, нужно платить за квартиру",
        priority: "Высокий",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "2",
        endDate: "В работе",
        status: "В работе",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "1",
        category: "done",
        task_id: "2",
        task_number: "2",
        title: "Приготовить Лазанью",
        description: "Сделать лазанью в лучших традициях Гарфилда",
        priority: "Низкий",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "4",
        endDate: "30.09.2023",
        status: "Выполнено",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "1",
        category: "done",
        task_id: "5",
        task_number: "5",
        title: "Погладить кота",
        description: "Погладь пока, все просто",
        priority: "Низкий",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "2",
        endDate: "30.09.2023",
        status: "Выполнено",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "1",
        category: "done",
        task_id: "4",
        task_number: "4",
        title: "Выключить утюг",
        description: "Выключи утюг, чтобы ни как в прошлый раз",
        priority: "Средний",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "2",
        endDate: "30.09.2023",
        status: "Выполнено",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "1",
        category: "queue",
        task_id: "6",
        task_number: "6",
        title: "Съесть лазанью",
        description: "Миссия: уничтожить",
        priority: "Высокий",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "В очереди",
        endDate: "В очереди",
        status: "В очереди",
        subtasks: [],
        comments: [],
      },
    ],
  },
  {
    title: "Project Beta",
    project_id: "2",
    tasks: [
      {
        project_id: "2",
        category: "queue",
        task_id: "1",
        task_number: "1",
        title: "Купить ноутбук",
        description: "Поискать варианты на Ozon",
        priority: "Средний",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "В очереди",
        endDate: "В очереди",
        status: "В очереди",
        subtasks: [
          {
            project_id: "2",
            task_id: "1",
            subtask_id: "1",
            content: "Wildberries тоже чекнуть",
            done: false,
          },
        ],
        comments: [
          {
            project_id: "2",
            task_id: "1",
            commentId: "1",
            content: "Шляпа полная, зачем делать такой коммент не понимаю",
          },
        ],
      },
      {
        project_id: "2",
        category: "dev",
        task_id: "3",
        task_number: "3",
        title: "Постирать белье",
        description: "Белое и цветное отдельно",
        priority: "Средний",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "2",
        endDate: "В работе",
        status: "В работе",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "2",
        category: "dev",
        task_id: "2",
        task_number: "2",
        title: "Сделать домашнее задание",
        description: "Сыну, не себе",
        priority: "Низкий",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "4",
        endDate: "В работе",
        status: "В работе",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "2",
        category: "queue",
        task_id: "5",
        task_number: "5",
        title: "Выполнить обещание",
        description: "Ну или завтра, как пойдет",
        priority: "Средний",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "В очереди",
        endDate: "В очереди",
        status: "В очереди",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "2",
        category: "done",
        task_id: "4",
        task_number: "4",
        title: "Помыть голову",
        description: "Не перепутать полотенце, пожалуйста",
        priority: "Высокий",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "2",
        endDate: "30.09.2023",
        status: "Выполнено",
        subtasks: [],
        comments: [],
      },
      {
        project_id: "2",
        category: "queue",
        task_id: "6",
        task_number: "6",
        title: "Попросить повышения",
        description: "Ты этого достойна - Loreal Paris",
        priority: "Высокий",
        createDate: "30.09.2023",
        createTime: "19:30",
        devStartTime: "В очереди",
        endDate: "В очереди",
        status: "В очереди",
        subtasks: [],
        comments: [],
      },
    ],
  },
];
