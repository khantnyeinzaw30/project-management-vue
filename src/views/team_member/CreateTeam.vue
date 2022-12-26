<template>
  <div class="container-fluid py-4">
    <div class="row mb-2">
      <div class="col-12 col-lg-6">
        <!-- Card -->
        <div class="card smooth-shadow-md">
          <!-- Card body -->
          <div class="card-body p-6">
            <div class="mb-4">
              <a href="#">
                <LogoComponent />
              </a>
              <p class="mb-6">Create New Team</p>
            </div>
            <!-- errors message -->
            <div class="alert alert-danger mb-2" v-if="errors.length">
              <ul>
                <li v-for="error in errors" :key="error">{{ error }}</li>
              </ul>
            </div>
            <!-- Form -->
            <form @submit.prevent="registerNewTeam">
              <div class="row mb-3">
                <label class="col-sm-4 col-form-label">Team Name</label>
                <div class="col-sm-8">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter your team name"
                    v-model="fields.team_name"
                  />
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-12 mt-3 col-lg-6 mt-lg-0">
        <TeamList />
      </div>
    </div>
  </div>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue";
import TeamList from "@/components/TeamListComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "TeamMember",
  components: { LogoComponent, TeamList },
  data() {
    return {
      fields: {
        team_name: "",
      },
      errors: [],
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    registerNewTeam() {
      this.axios
        .post("/api/teams", this.fields, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.data.status) {
            location.reload();
          } else {
            this.errors = response.data.messages.team_name;
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
