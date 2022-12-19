<template>
  <div class="container-fluid py-6">
    <div class="row justify-content-center g-0">
      <div class="card w-75">
        <div class="card-body">
          <div class="mb-4">
            <a href="#">
              <LogoComponent />
            </a>
            <p class="mb-6">Register as a team member</p>
          </div>
          <form @submit.prevent="registerAsNewTeamMember">
            <!-- role name -->
            <div class="row mb-3">
              <label class="col-sm-4 col-form-label">Role Name</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter your role"
                  v-model="fields.role_name"
                />
              </div>
            </div>
            <div class="row mb-3">
              <label class="col-sm-4 col-form-label">Team Name</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  :value="teamName"
                  disabled
                />
              </div>
            </div>
            <!-- Checkbox -->
            <div class="mb-3">
              <div class="form-check custom-checkbox">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="agreeCheck"
                  v-model="agreeTerms"
                />
                <label class="form-check-label" for="agreeCheck"
                  ><span class="fs-5"
                    >Registering as a team member can be done only once. Are you
                    sure ?</span
                  ></label
                >
              </div>
            </div>
            <button type="submit" class="btn btn-primary col-sm-2">Save</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LogoComponent from "@/components/LogoComponent.vue";

export default {
  name: "TeamMember",
  components: { LogoComponent },
  props: ["teamId"],
  data() {
    return {
      fields: {
        role_name: "",
        team_id: this.teamId,
      },
      teamName: "",
      agreeTerms: false,
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    registerAsNewTeamMember() {
      if (this.agreeTerms) {
        this.axios
          .post("/api/roles", this.fields, {
            headers: this.headers,
          })
          .then((response) => {
            if (response.data.status) {
              this.$router.push("/home");
            }
          })
          .catch((err) => console.log(err));
      }
    },
  },
  mounted() {
    this.axios
      .get(`/api/teams/${this.teamId}`, {
        headers: this.headers,
      })
      .then((response) => (this.teamName = response.data.team.team_name))
      .catch((err) => console.log(err));
  },
};
</script>
