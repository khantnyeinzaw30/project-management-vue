export default function changePriorityValue(tasks) {
  tasks.forEach((element) => {
    switch (element.priority) {
      case 0:
        element.priority = "Low";
        break;
      case 1:
        element.priority = "Medium";
        break;
      case 2:
        element.priority = "High";
        break;
    }
  });
}
