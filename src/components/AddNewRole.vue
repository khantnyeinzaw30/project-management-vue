<template>
  <div class="card w-75">
    <div class="card-body">
      <div class="mb-4">
        <a href="#">
          <LogoComponent />
        </a>
        <p class="mb-6">Add your new role</p>
      </div>
      <form @submit.prevent="addNewRole">
        <!-- create a new role -->
        <div class="row mb-3">
          <label class="col-sm-4 col-form-label">Role Name</label>
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              v-model="fields.role_name"
              placeholder="Enter your role"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import LogoComponent from "@/components/LogoComponent.vue";
import { mapGetters } from "vuex";

export default {
  name: "AddNewRole",
  components: { LogoComponent },
  data() {
    return {
      fields: {
        role_name: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    addNewRole() {
      this.axios
        .post("/api/roles", this.fields, {
          headers: this.headers,
        })
        .then((response) => {
          if (response.data.status) {
            this.$router.push({ name: "registerTeam" });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
