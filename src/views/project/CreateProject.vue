<template>
  <div class="container-fluid py-6">
    <div class="row align-items-center justify-content-center g-0">
      <div class="col-12 col-lg-8">
        <!-- Card -->
        <div class="card smooth-shadow-md">
          <!-- Card body -->
          <div class="card-body p-6">
            <div class="mb-4">
              <a href="#">
                <LogoComponent />
              </a>
              <p class="mb-6">Create New Project</p>
            </div>
            <!-- Form -->
            <form @submit.prevent="createProject">
              <!-- Project Name -->
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="projectData.project_name"
                  placeholder="Project Name Here"
                />
              </div>
              <!-- Description -->
              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="projectData.description"
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
                    v-model="projectData.started_at"
                  />
                </div>
                <!-- end date -->
                <div class="mb-3">
                  <label class="form-label">Date to end</label>
                  <input
                    type="date"
                    class="form-control"
                    v-model="projectData.ended_at"
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
import { mapGetters } from "vuex";
import LogoComponent from "../../components/LogoComponent.vue";

export default {
  name: "CreateProject",
  components: { LogoComponent },
  data() {
    return {
      projectData: {
        project_name: "",
        description: "",
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
    createProject() {
      this.axios
        .post("/api/projects", this.projectData, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.data.status === true) {
            this.$router.push({ name: "home" });
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
