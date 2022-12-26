<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12" v-if="toDos.length">
        <!-- card  -->
        <div class="card">
          <!-- card header  -->
          <div class="card-header bg-white border-bottom-0 py-4">
            <h4 class="mb-0">To do</h4>
          </div>
          <!-- table  -->
          <div class="table-responsive">
            <table class="table text-nowrap mb-0">
              <thead class="table-light">
                <tr>
                  <th>Task name</th>
                  <th>Priority</th>
                  <th>Project</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="toDo in toDos" :key="toDo.id">
                  <td class="align-middle">
                    <div class="d-flex align-items-center">
                      <div class="lh-1">
                        <h5 class="fw-bold mb-1 text-capitalize">
                          <a href="#" class="text-inherit">{{
                            toDo.task_name
                          }}</a>
                        </h5>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">
                    <span
                      class="badge text-bg-primary"
                      v-if="toDo.priority === 'Low'"
                      >{{ toDo.priority }}</span
                    >
                    <span
                      class="badge text-bg-warning"
                      v-if="toDo.priority === 'Medium'"
                      >{{ toDo.priority }}</span
                    >
                    <span
                      class="badge text-bg-danger"
                      v-if="toDo.priority === 'High'"
                      >{{ toDo.priority }}</span
                    >
                  </td>
                  <td class="align-middle">
                    <h5 class="fw-bold mb-1">
                      <router-link
                        :to="{
                          name: 'updateProject',
                          params: { projectId: toDo.project_id },
                        }"
                        class="text-inherit"
                        >{{ toDo.project_name }}</router-link
                      >
                    </h5>
                  </td>
                  <td class="align-middle">
                    <button
                      class="btn btn-info"
                      @click="
                        $router.push({
                          name: 'taskDetails',
                          params: { taskId: toDo.id },
                        })
                      "
                    >
                      <i class="fa-solid fa-circle-info"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="col-12 mt-3" v-if="taskList.length">
        <!-- card  -->
        <div class="card">
          <!-- card header  -->
          <div class="card-header bg-white border-bottom-0 py-4">
            <h4 class="mb-0">Tasks</h4>
          </div>
          <!-- table  -->
          <div class="table-responsive">
            <table class="table text-nowrap mb-0">
              <thead class="table-light">
                <tr>
                  <th>Task name</th>
                  <th>Assignee</th>
                  <th>Priority</th>
                  <th>Stage</th>
                  <th>Project</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="task in taskList" :key="task.id">
                  <td class="align-middle">
                    <div class="d-flex align-items-center">
                      <div class="lh-1">
                        <h5 class="fw-bold mb-1 text-capitalize">
                          <a href="#" class="text-inherit">{{
                            task.task_name
                          }}</a>
                        </h5>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">
                    <p class="ls-1">{{ task.assignee }}</p>
                  </td>
                  <td class="align-middle">
                    <span
                      class="badge text-bg-primary"
                      v-if="task.priority === 'Low'"
                      >{{ task.priority }}</span
                    >
                    <span
                      class="badge text-bg-warning"
                      v-if="task.priority === 'Medium'"
                      >{{ task.priority }}</span
                    >
                    <span
                      class="badge text-bg-danger"
                      v-if="task.priority === 'High'"
                      >{{ task.priority }}</span
                    >
                  </td>
                  <td class="align-middle">
                    <span
                      class="badge text-bg-danger"
                      v-if="task.task_stage === 'Not Started'"
                      >{{ task.task_stage }}</span
                    >
                    <span
                      class="badge text-bg-info"
                      v-if="task.task_stage === 'In Progress'"
                      >{{ task.task_stage }}</span
                    >
                    <span
                      class="badge text-bg-success"
                      v-if="task.task_stage === 'Done'"
                      >{{ task.task_stage }}</span
                    >
                  </td>
                  <td class="align-middle">
                    <h5>
                      <router-link
                        :to="{
                          name: 'updateProject',
                          params: { projectId: task.project_id },
                        }"
                        class="text-inherit"
                        >{{ task.project_name }}</router-link
                      >
                    </h5>
                  </td>
                  <td class="align-middle">
                    <span class="fs-5">
                      {{ task.team_name ? task.team_name : "Not in a team" }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        class="d-flex justify-content-center align-items-center min-vh-100"
        v-else
      >
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import changePriorityValue from "@/services/priority";
import { mapGetters } from "vuex";
import changeTaskStatusValue from "@/services/task-status";
import user from "@/services/user";

export default {
  name: "TaskList",
  data() {
    return {
      toDos: [],
      taskList: [],
      userId: user.id,
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    getUserToDos() {
      this.axios
        .get(`/api/toDos/${this.userId}`, {
          headers: this.headers,
        })
        .then((response) => {
          response.data.toDos.forEach((task) => {
            changePriorityValue(task);
          });
          this.toDos = response.data.toDos;
        })
        .catch((err) => console.log(err));
    },
    getAllTasks() {
      this.axios
        .get("/api/tasks", { headers: this.headers })
        .then((response) => {
          response.data.taskList.forEach((task) => {
            changePriorityValue(task);
          });
          response.data.taskList.forEach((task) => {
            changeTaskStatusValue(task);
          });
          return response.data.taskList;
        })
        .then((taskList) => (this.taskList = taskList))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getUserToDos();
    this.getAllTasks();
  },
};
</script>
