<template>
  <!-- row  -->
  <!-- card  -->
  <div class="card">
    <!-- card header  -->
    <div class="card-header bg-white border-bottom-0 py-4">
      <h4 class="mb-0">Active Projects</h4>
    </div>
    <!-- table  -->
    <div class="table-responsive">
      <table class="table text-nowrap mb-0">
        <thead class="table-light">
          <tr>
            <th>Project name</th>
            <th>Description</th>
            <th>Started Date</th>
            <th>Ended Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="align-middle">
              <div class="d-flex align-items-center">
                <div>
                  <div class="icon-shape icon-md border p-4 rounded-1">
                    <img src="assets/images/brand/dropbox-logo.svg" alt="" />
                  </div>
                </div>
                <div class="ms-3 lh-1">
                  <h5 class="fw-bold mb-1">
                    <a href="#" class="text-inherit">Dropbox Design System</a>
                  </h5>
                </div>
              </div>
            </td>
            <td class="align-middle">34</td>
            <td class="align-middle">
              <span class="badge badge-warning">Medium</span>
            </td>
            <td class="align-middle">
              <div class="avatar-group">
                <span class="avatar avatar-sm">
                  <img
                    alt="avatar"
                    src="assets/images/avatar/avatar-1.jpg"
                    class="rounded-circle"
                  />
                </span>
                <span class="avatar avatar-sm">
                  <img
                    alt="avatar"
                    src="assets/images/avatar/avatar-2.jpg"
                    class="rounded-circle"
                  />
                </span>
                <span class="avatar avatar-sm">
                  <img
                    alt="avatar"
                    src="assets/images/avatar/avatar-3.jpg"
                    class="rounded-circle"
                  />
                </span>
                <span class="avatar avatar-sm avatar-primary">
                  <span class="avatar-initials rounded-circle fs-6">+5</span>
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- card footer  -->
    <div class="card-footer bg-white text-center">
      <a href="#">View All Projects</a>
    </div>
  </div>
</template>
