export default function changeTaskStatusValue(tasks) {
  tasks.forEach((element) => {
    switch (element.task_stage) {
      case 0:
        element.task_stage = "Not Started";
        break;
      case 1:
        element.task_stage = "In Progress";
        break;
      case 2:
        element.task_stage = "Done";
        break;
    }
  });
}
