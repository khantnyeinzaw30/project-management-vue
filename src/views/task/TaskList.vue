<template>
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
                <th>Description</th>
                <th>Priority</th>
                <th>Project</th>
                <th>Started Date</th>
                <th>Ended Date</th>
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
                  <span class="text-muted">{{ task.description }}</span>
                </td>
                <td class="align-middle">
                  <span
                    class="badge text-bg-primary"
                    v-if="task.priority === 'Low'"
                    >{{ task.priority }}</span
                  >
                  <span
                    class="badge text-bg-medium"
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
                  <h5 class="fw-bold mb-1">
                    <a href="#" class="text-inherit">{{ task.project_id }}</a>
                  </h5>
                </td>
                <td class="align-middle">
                  <span class="badge text-bg-primary">{{
                    task.started_at
                  }}</span>
                </td>
                <td class="align-middle">
                  <span class="badge text-bg-primary">{{ task.ended_at }}</span>
                </td>
                <td class="align-middle">
                  <div
                    class="d-flex justify-content-center align-items-center gap-1"
                  >
                    <button class="btn btn-info">
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
  <div class="row mt-3">
    <div class="col-12 col-lg-8">
      <!-- Card -->
      <div class="card smooth-shadow-md">
        <!-- Card body -->
        <div class="card-body p-6">
          <div class="mb-4">
            <a href="#">
              <LogoComponent />
            </a>
            <p class="mb-6">Create New Task and assign another user</p>
          </div>
          <!-- Form -->
          <form @submit.prevent="">
            <!-- Project Name -->
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="formData.task_name"
                placeholder="Task Name Here"
              />
            </div>
            <!-- Description -->
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                class="form-control"
                cols="30"
                rows="10"
                v-model="formData.description"
                placeholder="Description Here"
              ></textarea>
            </div>
            <div>
              <!-- start date -->
              <div class="mb-3">
                <label class="form-label">Date to start</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="formData.started_at"
                />
              </div>
              <!-- end date -->
              <div class="mb-3">
                <label class="form-label">Date to end</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="formData.ended_at"
                />
              </div>
              <!-- Button -->
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue";
import { mapGetters } from "vuex";
export default {
  name: "TaskList",
  components: { LogoComponent },
  data() {
    return {
      taskList: null,
      formData: {},
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    getTasks() {
      this.axios
        .get("/api/tasks", {
          headers: this.headers,
        })
        .then((response) => {
          this.changePriorityValue(response.data.tasks);
          this.taskList = response.data.tasks;
        })
        .catch((err) => console.log(err));
    },
    changePriorityValue(tasks) {
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
    },
  },
  mounted() {
    this.getTasks();
  },
};
</script>
