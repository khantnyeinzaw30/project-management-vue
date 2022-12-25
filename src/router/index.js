import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import RegisterPage from "@/views/auth/RegisterPage.vue";
import CreateProject from "@/views/project/CreateProject.vue";
import UpdateProject from "@/views/project/UpdateProject.vue";
import TaskList from "@/views/task/TaskList.vue";
import CreateTask from "@/views/task/CreateTask.vue";
import TaskDetails from "@/views/task/TaskDetails.vue";
import CreateTeam from "@/views/team_member/CreateTeam.vue";
import CreateTeamMember from "@/views/team_member/CreateTeamMember.vue";

const routes = [
  {
    path: "/",
    name: "home",
    alias: "/home",
    component: HomePage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/create_project",
    name: "createProject",
    component: CreateProject,
  },
  {
    path: "/project/:projectId",
    name: "updateProject",
    component: UpdateProject,
    props: true,
  },
  {
    path: "/task_list",
    name: "taskList",
    component: TaskList,
  },
  {
    path: "/create_task",
    name: "createTask",
    component: CreateTask,
  },
  {
    path: "/taskDetails/:taskId",
    name: "taskDetails",
    component: TaskDetails,
    props: true,
  },
  {
    path: "/create_new_team",
    name: "createTeam",
    component: CreateTeam,
  },
  {
    path: "/create_team_member/:teamId",
    name: "createTeamMember",
    component: CreateTeamMember,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
