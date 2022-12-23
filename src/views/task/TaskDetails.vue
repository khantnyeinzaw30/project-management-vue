<template>
  <div class="container-fluid px-3 py-4">
    <div class="row">
      <div class="col-xl-6 col-lg-12 col-md-12 col-12 mb-6">
        <!-- card -->
        <div class="card">
          <!-- card body -->
          <div class="card-body">
            <!-- card title -->
            <h2 class="card-title mb-4">{{ task.task_name }}</h2>
            <span class="text-uppercase fw-medium text-dark fs-5 ls-2"
              >Details</span
            >
            <!-- text -->
            <p class="mt-2 mb-6">{{ task.description }}</p>
            <!-- row -->
            <div class="row">
              <div class="col-6 mb-5">
                <!-- text -->
                <h6 class="text-uppercase fs-5 ls-2">Project</h6>
                <p class="mb-0">{{ task.project_name }}</p>
              </div>
              <div class="col-6 mb-5">
                <!-- text -->
                <h6 class="text-uppercase fs-5 ls-2">Current Status</h6>
                <div>
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
                </div>
              </div>
              <div class="col-6 mb-5">
                <h6 class="text-uppercase fs-5 ls-2">Change Status</h6>
                <form @submit.prevent="changeStatus">
                  <div class="d-flex">
                    <select
                      class="form-select form-select-sm w-50 me-1"
                      v-model="fields.task_stage"
                    >
                      <option value="">Change Status</option>
                      <option value="0">Not Started</option>
                      <option value="1">In Progress</option>
                      <option value="2">Done</option>
                    </select>
                    <button class="btn btn-primary btn-sm">Save</button>
                  </div>
                </form>
              </div>
              <div class="col-6 mb-5">
                <h6 class="text-uppercase fs-5 ls-2">Date to start</h6>
                <p class="mb-0">{{ task.started_at }}</p>
              </div>
              <div class="col-6">
                <h6 class="text-uppercase fs-5 ls-2">Date to end</h6>
                <p class="mb-0">{{ task.ended_at }}</p>
              </div>
              <div class="col-6">
                <h6 class="text-uppercase fs-5 ls-2">Priority</h6>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import changeDateFormat from "@/services/date-format";
import changePriorityValue from "@/services/priority";
import changeTaskStatusValue from "@/services/task-status";

export default {
  name: "TaskDetails",
  props: ["taskId"],
  data() {
    return {
      task: {},
      fields: {
        task_stage: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    getSingleTask() {
      this.axios
        .get(`/api/tasks/${this.taskId}`, {
          headers: this.headers,
        })
        .then((response) => {
          changePriorityValue(response.data.task);
          changeTaskStatusValue(response.data.task);
          response.data.task.started_at = changeDateFormat(
            response.data.task.started_at
          );
          response.data.task.ended_at = changeDateFormat(
            response.data.task.ended_at
          );
          return response.data.task;
        })
        .then((task) => {
          this.task = task;
        })
        .catch((err) => console.log(err));
    },
    changeStatus() {
      this.axios
        .put(`/api/changeTaskStage/${this.taskId}`, this.fields, {
          headers: this.headers,
        })
        .then((response) => {
          changeTaskStatusValue(response.data.task);
          return response.data.task;
        })
        .then((task) => (this.task.task_stage = task.task_stage))
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getSingleTask();
  },
};
</script>
