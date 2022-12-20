<template>
  <div class="row">
    <div class="col-12 col-lg-4">
      <div class="card mb-4">
        <h3 class="card-header text-primary">
          {{ project.project_name }}
        </h3>
        <div class="card-body p-4">
          <p class="card-text">{{ project.description }}</p>
          <span class="badge text-bg-primary me-3">{{
            project.started_at
          }}</span>
          <span class="badge text-bg-primary">{{ project.ended_at }}</span>
        </div>
      </div>
    </div>
    <div class="col-12 col-lg-8">
      <!-- Card -->
      <div class="card smooth-shadow-md">
        <!-- Card body -->
        <div class="card-body p-6">
          <div class="mb-4">
            <a href="#">
              <LogoComponent />
            </a>
            <p class="mb-6">Update {{ project.project_name }}</p>
          </div>
          <!-- Form -->
          <form @submit.prevent="updateProject">
            <!-- Project Name -->
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="updateData.project_name"
                placeholder="New Project Name Here"
              />
            </div>
            <!-- Description -->
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea
                class="form-control"
                cols="30"
                rows="10"
                v-model="updateData.description"
                placeholder="New Description Here"
              ></textarea>
            </div>
            <div>
              <!-- start date -->
              <div class="mb-3">
                <label class="form-label">New Start Date</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="updateData.started_at"
                />
              </div>
              <!-- end date -->
              <div class="mb-3">
                <label class="form-label">New End Date</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="updateData.ended_at"
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
import LogoComponent from "../../components/LogoComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "UpdateProject",
  components: {
    LogoComponent,
  },
  props: ["projectId"],
  data() {
    return {
      updateData: {
        project_name: "",
        description: "",
        started_at: "",
        ended_at: "",
      },
      project: [],
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    updateProject() {
      this.axios
        .put(`/api/projects/${this.projectId}`, this.updateData, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.data.status === true) {
            this.$router.push({ name: "home" });
          }
        })
        .catch((e) => console.log(e));
    },
    getProjectToUpdate() {
      this.axios
        .get(`/api/projects/${this.projectId}`, {
          headers: this.headers,
        })
        .then((response) => {
          this.project = response.data.project;
        })
        .catch((e) => console.log(e));
    },
  },
  mounted() {
    this.getProjectToUpdate();
  },
};
</script>
