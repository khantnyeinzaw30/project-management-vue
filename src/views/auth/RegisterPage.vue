<template>
  <div class="row align-items-center justify-content-center g-0 min-vh-100">
    <div class="col-12 col-md-8 py-8">
      <!-- Card -->
      <div class="card smooth-shadow-md">
        <!-- Card body -->
        <div class="card-body p-6">
          <div class="mb-4">
            <a href="#">
              <LogoComponent />
            </a>
            <p class="mb-6">Please enter your user information.</p>
          </div>
          <div class="alert alert-danger" v-if="isRequired">
            <span>{{ isRequired }}</span>
          </div>
          <div class="alert alert-danger" v-if="errors">
            <ul>
              <li v-if="errors.name">
                <span v-for="e in errors.name" :key="e">{{ e }}</span>
              </li>
              <li v-if="errors.email">
                <span v-for="e in errors.email" :key="e">{{ e }}</span>
              </li>
              <li v-if="errors.password">
                <span v-for="e in errors.password" :key="e">{{ e }}</span>
              </li>
            </ul>
          </div>
          <!-- Form -->
          <form @submit.prevent="register">
            <!-- Username -->
            <div class="mb-3">
              <label for="username" class="form-label">User Name</label>
              <input
                type="text"
                id="username"
                class="form-control"
                v-model="registerData.name"
                placeholder="User Name"
              />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input
                type="email"
                id="email"
                class="form-control"
                v-model="registerData.email"
                placeholder="Email address here"
              />
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input
                type="number"
                id="phone"
                class="form-control"
                v-model="registerData.phone"
                placeholder="Phone number here"
              />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                id="password"
                class="form-control"
                v-model="registerData.password"
                placeholder="........."
              />
            </div>
            <!-- Password confirm -->
            <div class="mb-3">
              <label for="confirm-password" class="form-label"
                >Confirm Password</label
              >
              <input
                type="password"
                id="confirm-password"
                class="form-control"
                v-model="registerData.passwordConfirmation"
                placeholder="........."
              />
            </div>
            <div class="alert alert-danger" v-if="isPasswordNotConfirmed">
              <span>{{ isPasswordNotConfirmed }}</span>
            </div>
            <div>
              <!-- Button -->
              <div class="d-grid">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="processing"
                >
                  {{ processing ? "Please wait" : "Create account" }}
                </button>
              </div>

              <div class="d-md-flex justify-content-between mt-4">
                <div class="mb-2 mb-md-0">
                  <router-link :to="{ name: 'login' }" class="fs-5"
                    >Already member? Login
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
  name: "RegisterView",
  components: { LogoComponent },
  data() {
    return {
      registerData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirmation: "",
      },
      isRequired: "",
      isPasswordNotConfirmed: "",
      errors: null,
      processing: false,
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/login",
    }),
    register() {
      if (
        !this.registerData.name ||
        !this.registerData.email ||
        !this.registerData.password ||
        !this.registerData.phone
      ) {
        this.isRequired = "Please fill all info!";
      } else if (
        this.registerData.password !== this.registerData.passwordConfirmation
      ) {
        this.isPasswordNotConfirmed =
          "Password and password confirmation didn't match!";
      } else {
        this.processing = true;
        this.axios
          .post("/api/register", this.registerData)
          .then((response) => {
            if (response.data.status) {
              this.signIn(response.data);
            } else {
              this.errors = response.data.errors;
            }
          })
          .catch((error) => console.log(error))
          .finally(() => (this.processing = false));
      }
    },
  },
};
</script>
