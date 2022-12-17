import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginPage from "../views/auth/LoginPage.vue";
import RegisterPage from "../views/auth/RegisterPage.vue";
import CreateProject from "../views/project/CreateProject.vue";
import SingleProject from "../views/project/SingleProject.vue";
import TaskList from "../views/task/TaskList.vue";
import isAuthenticated from "@/services/isAuthenticated";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
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
    name: "singleProject",
    component: SingleProject,
    props: true,
  },
  {
    path: "/task_list",
    name: "taskList",
    component: TaskList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !isAuthenticated) {
    next({ name: "login" });
  } else next();
});

export default router;
