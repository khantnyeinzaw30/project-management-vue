<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-12">
        <!-- card  -->
        <div class="card">
          <!-- card header  -->
          <div class="card-header bg-white border-bottom-0 py-4">
            <h4 class="mb-0">Assigned Tasks</h4>
          </div>
          <!-- table  -->
          <div class="table-responsive">
            <table class="table text-nowrap mb-0">
              <thead class="table-light">
                <tr>
                  <th>Task name</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Project</th>
                  <th></th>
                </tr>
              </thead>
              <tbody v-if="taskList">
                <tr v-for="task in taskList" :key="task.id">
                  <td class="align-middle">
                    <div class="d-flex align-items-center">
                      <div class="lh-1">
                        <h5 class="fw-bold mb-1">
                          <a href="#" class="text-inherit">{{
                            task.task_name
                          }}</a>
                        </h5>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle">
                    <span
                      class="badge text-bg-primary"
                      v-if="task.priority === 'Low'"
                      >{{ task.priority }}</span
                    >
                    <span
                      class="badge text-bg-info"
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
                      class="badge text-bg-primary"
                      v-if="task.task_stage === 'Not Started'"
                      >{{ task.task_stage }}</span
                    >
                    <span
                      class="badge text-bg-info"
                      v-if="task.task_stage === 'In Progress'"
                      >{{ task.task_stage }}</span
                    >
                    <span
                      class="badge text-bg-danger"
                      v-if="task.task_stage === 'Done'"
                      >{{ task.task_stage }}</span
                    >
                  </td>
                  <td class="align-middle">
                    <h5 class="fw-bold mb-1">
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
                    <div
                      class="d-flex justify-content-center align-items-center gap-1"
                    >
                      <button
                        class="btn btn-info"
                        @click="
                          $router.push({
                            name: 'taskDetails',
                            params: { taskId: task.id },
                          })
                        "
                      >
                        <i class="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button class="btn btn-danger">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import changePriorityValue from "@/services/priority";
// import changeTaskStatusValue from "@/services/task-status";
import { mapGetters } from "vuex";

export default {
  name: "TaskList",
  data() {
    return {
      taskList: null,
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    // getTasks() {
    //   let userData = JSON.parse(localStorage.getItem("userData"));
    //   let userId = userData.id;
    //   this.axios
    //     .get(`/api/assigned_tasks/${userId}`, {
    //       headers: this.headers,
    //     })
    //     .then((response) => {
    //       changePriorityValue(response.data.assignedTasks);
    //       changeTaskStatusValue(response.data.assignedTasks);
    //       this.taskList = response.data.assignedTasks;
    //     })
    //     .catch((err) => console.log(err));
    // },
  },
  mounted() {
    // this.getTasks();
  },
};
</script>
