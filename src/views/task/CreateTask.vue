<template>
  <div class="container-fluid py-3">
    <div class="row">
      <div class="col-12 col-lg-8 offset-lg-2">
        <!-- Card -->
        <div class="card smooth-shadow-md">
          <!-- Card body -->
          <div class="card-body p-6">
            <div class="mb-4">
              <a href="#">
                <LogoComponent />
              </a>
              <p class="mb-6">Create Task first and select assignee.</p>
            </div>
            <!-- Form -->
            <form @submit.prevent="createTask">
              <!-- task name -->
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="fields.task_name"
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
                  v-model="fields.description"
                  placeholder="Description Here"
                ></textarea>
              </div>
              <!-- project in which task will include -->
              <div class="mb-3">
                <label class="form-label">Project</label>
                <select class="form-select" v-model="fields.project_id">
                  <option value="">Choose Project</option>
                  <option
                    v-for="project in projectList"
                    :key="project.id"
                    :value="project.id"
                  >
                    {{ project.project_name }}
                  </option>
                </select>
              </div>
              <!-- Task Priority -->
              <div class="mb-3">
                <label class="form-label">Priority</label>
                <select class="form-select" v-model="fields.priority">
                  <option value="">Choose Priority</option>
                  <option value="0">Low</option>
                  <option value="1">Medium</option>
                  <option value="2">High</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Assignee</label>
                <select class="form-select" v-model="fields.assignee_id">
                  <option value="">Choose Assignee</option>
                  <option
                    :value="user.id"
                    v-for="user in userList"
                    :key="user.id"
                  >
                    {{ user.name }}
                  </option>
                </select>
              </div>
              <div>
                <!-- start date -->
                <div class="mb-3">
                  <label class="form-label">Date to start</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="fields.started_at"
                  />
                </div>
                <!-- end date -->
                <div class="mb-3">
                  <label class="form-label">Date to end</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="fields.ended_at"
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
  </div>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "CreateTask",
  components: { LogoComponent },
  data() {
    return {
      projectList: [],
      userList: [],
      fields: {
        task_name: "",
        description: "",
        project_id: "",
        priority: "",
        assignee_id: "",
        started_at: "",
        ended_at: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    createTask() {
      this.axios
        .post("/api/tasks", this.fields, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.data.status) {
            this.$router.push({ name: "home" });
          }
        })
        .catch((err) => console.log(err));
    },
    getProjects() {
      this.axios
        .get("/api/projects", {
          headers: this.headers,
        })
        .then((response) => (this.projectList = response.data.projects))
        .catch((err) => console.log(err));
    },
    getUsers() {
      this.axios
        .get(`/api/userList`, {
          headers: this.headers,
        })
        .then((response) => {
          this.userList = response.data.userList;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getProjects();
    this.getUsers();
  },
};
</script>
