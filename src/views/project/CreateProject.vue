<template>
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
          <!-- error messages -->
          <div class="alert alert-danger" v-if="errors">
            <ul>
              <li v-if="errors.project_name">
                <span v-for="e in errors.project_name" :key="e">{{ e }}</span>
              </li>
              <li v-if="errors.description">
                <span v-for="e in errors.description" :key="e">{{ e }}</span>
              </li>
              <li v-if="errors.started_at">
                <span v-for="e in errors.started_at" :key="e">{{ e }}</span>
              </li>
              <li v-if="errors.ended_at">
                <span v-for="e in errors.ended_at" :key="e">{{ e }}</span>
              </li>
            </ul>
          </div>
          <!-- Form -->
          <form @submit.prevent="createProject">
            <!-- Project Name -->
            <div class="mb-3">
              <label class="form-label">Name</label>
              <input
                type="text"
                class="form-control"
                v-model="fields.project_name"
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
                v-model="fields.description"
                placeholder="Description Here"
              ></textarea>
            </div>
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
            <div>
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
import { mapGetters } from "vuex";
import LogoComponent from "../../components/LogoComponent.vue";

export default {
  name: "CreateProject",
  components: { LogoComponent },
  data() {
    return {
      fields: {
        project_name: "",
        description: "",
        started_at: "",
        ended_at: "",
      },
      errors: null,
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
        .post("/api/projects", this.fields, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.data.status) {
            this.$router.push({ name: "home" });
          } else {
            this.errors = response.data.messages;
          }
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
