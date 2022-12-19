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
            <th>Name</th>
            <th>Role</th>
            <th>Participated Team</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in teamMemberList" :key="member.id">
            <td class="align-middle">
              <div class="d-flex align-items-center">
                <div></div>
                <div class="ms-3 lh-1">
                  <h5 class="fw-bold mb-1">{{ member.user_name }}</h5>
                  <p class="mb-0">{{ member.user_email }}</p>
                </div>
              </div>
            </td>
            <td class="align-middle">{{ member.role_name }}</td>
            <td class="align-middle">{{ member.team_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "TeamMembers",
  data() {
    return {
      teamMemberList: [],
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    getMemberList() {
      this.axios
        .get("/api/team_members", {
          headers: this.headers,
        })
        .then((response) => {
          this.teamMemberList = response.data.teamMembers;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.getMemberList();
  },
};
</script>
