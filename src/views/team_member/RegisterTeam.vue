<template>
  <div class="container-fluid py-6">
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
              <p class="mb-6">Register your new team</p>
            </div>
            <!-- Form -->
            <form @submit.prevent="registerNewTeam">
              <div
                class="alert alert-danger mb-2"
                v-if="validationErrors.length"
              >
                <small v-for="error in validationErrors" :key="error">{{
                  error
                }}</small>
              </div>
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
              <button type="submit" class="btn btn-primary col-sm-2">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <TeamList />
      </div>
    </div>
  </div>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue";
import TeamList from "@/components/TeamList.vue";
import { mapGetters } from "vuex";
export default {
  name: "TeamMember",
  components: { LogoComponent, TeamList },
  data() {
    return {
      fields: {
        team_name: "",
      },
      validationErrors: [],
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    registerNewTeam() {
      if (this.agreeToRegisterNewTeam) {
        this.axios
          .post("/api/teams", this.fields, {
            headers: this.headers,
          })
          .then((response) => {
            if (response.data.status) {
              location.reload();
            } else {
              this.validationErrors = response.data.messages.team_name;
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
