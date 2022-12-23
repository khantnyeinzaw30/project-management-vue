export default function changePriorityValue(task) {
  switch (task.priority) {
    case 0:
      task.priority = "Low";
      break;
    case 1:
      task.priority = "Medium";
      break;
    case 2:
      task.priority = "High";
      break;
  }
}
