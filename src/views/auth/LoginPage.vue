<template>
  <div class="row align-items-center justify-content-center g-0 min-vh-100">
    <div class="col-12 col-md-8 col-lg-6 col-xxl-4 py-8 py-xl-0">
      <!-- Card -->
      <div class="card smooth-shadow-md">
        <!-- Card body -->
        <div class="card-body p-6">
          <div class="mb-4">
            <a href="#"><LogoComponent /></a>
            <p class="mb-6">Please enter your user information.</p>
          </div>
          <div class="alert alert-danger" v-if="logginFailed">
            <strong>The credentials do not match!</strong>
          </div>
          <!-- Form -->
          <form @submit.prevent="login">
            <!-- email -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                :class="{ 'is-invalid': logginFailed }"
                v-model="loginData.email"
                placeholder="Email address here"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                :class="{ 'is-invalid': logginFailed }"
                v-model="loginData.password"
                placeholder="Password here"
              />
            </div>
            <div>
              <!-- Button -->
              <div class="d-grid">
                <button type="submit" class="btn btn-primary">Sign in</button>
              </div>
              <div class="d-md-flex justify-content-between mt-4">
                <div class="mb-md-0">
                  <router-link :to="{ name: 'register' }" class="fs-5"
                    >Create An Account
                  </router-link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import LogoComponent from "@/components/LogoComponent.vue";

export default {
  name: "LoginView",
  components: { LogoComponent },
  data() {
    return {
      loginData: {
        email: "",
        password: "",
      },
      logginFailed: false,
    };
  },
  methods: {
    ...mapActions(["storeUserData"]),
    login() {
      if (!this.loginData.email || !this.loginData.password) {
        alert("Please fill all the inputs");
      } else {
        this.axios
          .post("/api/login", this.loginData)
          .then((response) => {
            if (response.data.status == true) {
              this.storeUserData(response.data).then(() =>
                this.$router.push({ name: "home" })
              );
            } else {
              this.logginFailed = true;
            }
          })
          .catch((error) => console.log(error.message));
      }
    },
    // clear input
    clearInput() {
      this.loginData.email = "";
      this.loginData.password = "";
    },
  },
};
</script>
