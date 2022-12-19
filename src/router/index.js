import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import RegisterPage from "@/views/auth/RegisterPage.vue";
import CreateProject from "@/views/project/CreateProject.vue";
import SingleProject from "@/views/project/SingleProject.vue";
import TaskList from "@/views/task/TaskList.vue";
import RegisterTeam from "@/views/team_member/RegisterTeam.vue";
import TeamMember from "@/views/team_member/TeamMember.vue";
// import store from "@/store";

const routes = [
  {
    path: "/",
    name: "home",
    alias: "/home",
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
  {
    path: "/register_new_team",
    name: "registerTeam",
    component: RegisterTeam,
  },
  {
    path: "/team_member/:teamId",
    name: "teamMember",
    component: TeamMember,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   store.commit("currentUserAuth");
//   if (to.name !== "login" && !store.authentication) {
//     next({ name: "login" });
//   } else if (from.name === "login" && store.authentication) {
//     next();
//   }
// });

export default router;
