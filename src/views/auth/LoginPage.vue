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
          <div class="alert alert-danger" v-if="isRequired">
            <strong>Please fill all fields!</strong>
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
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="processing"
                >
                  {{ processing ? "Please wait" : "Sign In" }}
                </button>
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
      processing: false,
      logginFailed: false,
      isRequired: false,
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
    }),
    login() {
      if (!this.loginData.email || !this.loginData.password) {
        this.isRequired = true;
      } else {
        this.processing = true;
        this.axios
          .post("/api/login", this.loginData)
          .then((response) => {
            if (response.data.status) {
              this.signIn(response.data);
            } else {
              this.logginFailed = true;
            }
          })
          .catch((error) => console.log(error.message))
          .finally(() => (this.processing = false));
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
