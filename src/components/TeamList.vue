<template>
  <div class="card h-100">
    <!-- card header  -->
    <div class="card-header bg-white border-bottom-0 py-4">
      <h4 class="mb-0">Teams</h4>
    </div>
    <!-- table  -->
    <div class="table-responsive">
      <table class="table text-nowrap">
        <thead class="table-light">
          <tr>
            <th>Team Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="team in teamList" :key="team.id">
            <td class="align-middle">
              <div class="lh-1">
                <h5 class="fw-bold mb-1">
                  <a href="#" class="text-inherit">{{ team.team_name }}</a>
                </h5>
              </div>
            </td>
            <td class="align-middle">
              <div
                class="d-flex justify-content-center align-items-center gap-1"
              >
                <button
                  class="btn btn-primary rounded btn-sm"
                  @click="
                    $router.push({
                      name: 'teamMember',
                      params: {
                        teamId: team.id,
                      },
                    })
                  "
                >
                  <i class="fa-solid fa-user-plus"></i>
                </button>
                <button
                  class="btn btn-danger rounded btn-sm"
                  @click="deleteTeam(team.id)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TeamList",
  data() {
    return {
      teamList: [],
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    getTeamList() {
      this.axios
        .get("/api/teams", {
          headers: this.headers,
        })
        .then((response) => {
          this.teamList = response.data.teams;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getTeamList();
  },
};
</script>
