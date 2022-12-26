export default function changeTaskStatusValue(task) {
  switch (task.task_stage) {
    case 0:
      task.task_stage = "Not Started";
      break;
    case 1:
      task.task_stage = "In Progress";
      break;
    case 2:
      task.task_stage = "Done";
      break;
  }
}
