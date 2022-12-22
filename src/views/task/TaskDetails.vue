<template>
  <div class="container-fluid px-3 py-4">
    <div class="row">
      <div class="col-12">
        <!-- card -->
        <div class="card">
          <!-- card body -->
          <div class="card-body">
            <div class="mb-6">
              <h4 class="mb-1">Task Details</h4>
            </div>
            <div class="row align-items-center mb-8">
              <div class="col-md-3 mb-3 mb-md-0">
                <h5 class="mb-0">Avatar</h5>
              </div>
              <div class="col-md-9">
                <div class="d-flex align-items-center">
                  <div class="me-3">
                    <img
                      src=""
                      class="rounded-circle avatar avatar-lg"
                      alt=""
                    />
                  </div>
                  <div>
                    <button type="submit" class="btn btn-outline-white me-1">
                      Change
                    </button>
                    <button type="submit" class="btn btn-outline-white">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- col -->
            <div class="row mb-8">
              <div class="col-md-3 mb-3 mb-md-0">
                <!-- heading -->
                <h5 class="mb-0">Cover photo</h5>
              </div>
              <div class="col-md-9">
                <!-- dropzone input -->
                <div>
                  <form action="#" class="dropzone mb-3 border-dashed">
                    <div class="fallback">
                      <input name="file" type="file" multiple />
                    </div>
                  </form>
                  <button type="submit" class="btn btn-outline-white">
                    Change
                  </button>
                </div>
              </div>
            </div>
            <div>
              <!-- border -->
              <div class="mb-6">
                <h4 class="mb-1">Basic information</h4>
              </div>
              <form>
                <!-- row -->

                <div class="mb-3 row">
                  <label
                    for="fullName"
                    class="col-sm-4 col-form-label form-label"
                    >Full name</label
                  >
                  <div class="col-sm-4 mb-3 mb-lg-0">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First name"
                      id="fullName"
                      required
                    />
                  </div>
                  <div class="col-sm-4">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last name"
                      id="lastName"
                      required
                    />
                  </div>
                </div>

                <!-- row -->
                <div class="mb-3 row">
                  <label for="email" class="col-sm-4 col-form-label form-label"
                    >Email</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Email"
                      id="email"
                      required
                    />
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label for="phone" class="col-sm-4 col-form-label form-label"
                    >Phone <span class="text-muted">(Optional)</span></label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Phone"
                      id="phone"
                      required
                    />
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="location"
                    class="col-sm-4 col-form-label form-label"
                    >Location</label
                  >

                  <div class="col-md-8 col-12">
                    <select class="form-select" id="location">
                      <option selected>Select Country</option>
                      <option value="1">India</option>
                      <option value="2">UK</option>
                      <option value="3">USA</option>
                    </select>
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="addressLine"
                    class="col-sm-4 col-form-label form-label"
                    >Address line 1</label
                  >

                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="placeholder"
                      id="addressLine"
                      required
                    />
                  </div>
                </div>
                <!-- row -->
                <div class="mb-3 row">
                  <label
                    for="addressLineTwo"
                    class="col-sm-4 col-form-label form-label"
                    >Address line 2</label
                  >
                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="placeholder"
                      id="addressLineTwo"
                      required
                    />
                  </div>
                </div>
                <!-- row -->
                <div class="row align-items-center">
                  <label
                    for="zipcode"
                    class="col-sm-4 col-form-label form-label"
                    >Zip code <i data-feather="info" class="me-2 icon-xs"></i
                  ></label>

                  <div class="col-md-8 col-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="placeholder"
                      id="zipcode"
                      required
                    />
                  </div>
                  <div class="offset-md-4 col-md-8 mt-4">
                    <button type="submit" class="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import changeDateFormat from "@/services/date-format";

export default {
  name: "TaskDetails",
  props: ["taskId"],
  data() {
    return {
      task: {},
      taskStatus: "",
    };
  },
  computed: {
    ...mapGetters({
      headers: "getHeaders",
    }),
  },
  methods: {
    getSingleTask() {
      this.axios
        .get(`/api/tasks/${this.taskId}`, {
          headers: this.headers,
        })
        .then((response) => {
          this.changePriorityValue(response.data.task);
          this.changeTaskStatusValue(response.data.task);
          changeDateFormat(response.data.task.ended_at);
          this.task = response.data.task;
          return this.task;
        })
        .then((task) => {
          task.started_at = changeDateFormat(this.task.started_at);
          task.ended_at = changeDateFormat(this.task.ended_at);
        })
        .catch((err) => console.log(err));
    },
    changeTaskStatusValue(task) {
      switch (task.task_stage) {
        case 0:
          task.task_stage = "Not Started";
          break;
        case 1:
          task.task_stage = "In Progress";
          break;
        case 2:
          task.task_stage = "Done";
          break;
      }
    },
    changePriorityValue(task) {
      switch (task.priority) {
        case 0:
          task.priority = "Low";
          break;
        case 1:
          task.priority = "Medium";
          break;
        case 2:
          task.priority = "High";
          break;
      }
    },
  },
  mounted() {
    this.getSingleTask();
  },
};
</script>
