<template>
  <div class="bg-primary pt-10 pb-21"></div>
  <div class="container-fluid mt-n22 px-6">
    <div class="row">
      <div class="col-lg-12 col-md-12 col-12">
        <!-- Page header -->
        <div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="mb-2 mb-lg-0">
              <h3 class="mb-0 fw-bold text-white">Projects</h3>
            </div>
            <div>
              <router-link :to="{ name: 'createProject' }" class="btn btn-white"
                >Create New Project</router-link
              >
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-6">
        <!-- card -->
        <div class="card rounded-3">
          <!-- card body -->
          <div class="card-body">
            <!-- heading -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 class="mb-0">Projects</h4>
              </div>
              <div
                class="icon-shape icon-md bg-light-primary text-primary rounded-1"
              >
                <i class="fa-solid fa-briefcase fs-4"></i>
              </div>
            </div>
            <!-- project number -->
            <div>
              <h1 class="fw-bold">{{ projectCount }}</h1>
              <p class="mb-0"><span class="text-dark me-2">2</span>Completed</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-6">
        <!-- card -->
        <div class="card rounded-3">
          <!-- card body -->
          <div class="card-body">
            <!-- heading -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 class="mb-0">Active Task</h4>
              </div>
              <div
                class="icon-shape icon-md bg-light-primary text-primary rounded-1"
              >
                <i class="fa-solid fa-list-check fs-4"></i>
              </div>
            </div>
            <!-- project number -->
            <div>
              <h1 class="fw-bold">{{ taskCount }}</h1>
              <p class="mb-0">
                <span class="text-dark me-2">28</span>Completed
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4 col-lg-6 col-md-12 col-12 mt-6">
        <!-- card -->
        <div class="card rounded-3">
          <!-- card body -->
          <div class="card-body">
            <!-- heading -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h4 class="mb-0">Teams</h4>
              </div>
              <div
                class="icon-shape icon-md bg-light-primary text-primary rounded-1"
              >
                <i class="fa-solid fa-circle-user fs-4"></i>
              </div>
            </div>
            <!-- project number -->
            <div>
              <h1 class="fw-bold">{{ teamCount }}</h1>
              <p class="mb-0"><span class="text-dark me-2">1</span>Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-6">
      <div class="col-md-12 col-12">
        <ActiveProjects />
      </div>
    </div>
    <div class="row my-6">
      <!-- card  -->
      <div class="col-lg-12 col-md-12 col-12">
        <TeamMembers />
      </div>
    </div>
  </div>
</template>

<script>
import ActiveProjects from "../components/ActiveProjects.vue";
import TeamMembers from "../components/TeamMembers.vue";
export default {
  name: "HomeView",
  components: {
    ActiveProjects,
    TeamMembers,
  },
  data() {
    return {
      projectCount: 0,
      teamCount: 0,
      taskCount: 0,
    };
  },
  methods: {
    getAllCounts() {
      console.log("running");
    },
  },
  mounted() {
    this.getAllCounts();
  },
};
</script>
