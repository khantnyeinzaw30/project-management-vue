<template>
  <div class="container-fluid py-4">
    <div class="row justify-content-center g-0">
      <div class="card w-75 mb-3">
        <div class="card-body">
          <div class="mb-4">
            <a href="#">
              <LogoComponent />
            </a>
            <p class="mb-6">Register as a team member</p>
          </div>
          <form @submit.prevent="registerAsNewTeamMember">
            <!-- select existing role -->
            <div class="row mb-3">
              <label class="col-sm-4 col-form-label">Role Name</label>
              <div class="col-sm-8">
                <select class="form-control" v-model="fields.role_id">
                  <option value="">Choose Options</option>
                  <option
                    v-for="role in roleList"
                    :key="role.id"
                    :value="role.id"
                  >
                    {{ role.role_name }}
                  </option>
                </select>
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
                    >Are you sure to be a part of this team?</span
                  ></label
                >
              </div>
            </div>
            <div class="d-flex justify-content-start gap-2">
              <button type="submit" class="btn btn-primary">Save</button>
              <button
                type="button"
                class="btn btn-info"
                @click="addNewRole = !addNewRole"
              >
                {{
                  addNewRole
                    ? "choose role in options after you added your role"
                    : "add new role"
                }}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div v-if="addNewRole" class="w-75">
        <AddNewRoleComponent @push="pushNewRole" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LogoComponent from "@/components/LogoComponent.vue";
import AddNewRoleComponent from "@/components/AddNewRoleComponent.vue";
import user from "@/services/user";

export default {
  name: "TeamMember",
  components: { LogoComponent, AddNewRoleComponent },
  props: ["teamId"],
  data() {
    return {
      fields: {
        user_id: user.id,
        role_id: "",
        team_id: this.teamId,
      },
      addNewRole: false,
      teamName: "",
      roleList: [],
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
          .post("/api/team_members", this.fields, {
            headers: this.headers,
          })
          .then((response) => {
            if (response.data.status) {
              this.$router.push({ name: "home" });
            }
          })
          .catch((err) => console.log(err));
      }
    },
    getRoles() {
      this.axios
        .get("/api/roles", {
          headers: this.headers,
        })
        .then((response) => {
          this.roleList = response.data.roles;
        })
        .catch((err) => console.log(err));
    },
    getTeam() {
      this.axios
        .get(`/api/teams/${this.teamId}`, {
          headers: this.headers,
        })
        .then((response) => (this.teamName = response.data.team.team_name))
        .catch((err) => console.log(err));
    },
    pushNewRole(role) {
      this.roleList.push(role);
      this.addNewRole = false;
    },
  },
  mounted() {
    this.getRoles();
    this.getTeam();
  },
};
</script>
