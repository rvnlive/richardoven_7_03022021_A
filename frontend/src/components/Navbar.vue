<template>
  <b-container class="bg-info sticky-top" fluid>
    <b-navbar
      toggleable="lg"
      variant="primary"
      class="row mr-2 ml-2 shadow-lg rounded-bottom"
    >
      <b-navbar-brand href="#">
        <img
          src="../assets/edited/icon-left-font-monochrome-white.png"
          width="200"
          alt="Groupomania logo"
        />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Navigation Menu Dropdown -->
        <b-dropdown
          id="dropdown-nav"
          text="Home"
          variant="light"
          size="md"
          class="animated"
        >
          <b-dropdown-item active>Home</b-dropdown-item>
          <b-dropdown-item >Categories</b-dropdown-item>
          <b-dropdown-item disabled>Status</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>Help</b-dropdown-item>
        </b-dropdown>
        <b-navbar-nav
          class="w-100 justify-content-center align-content-center mt-3 mt-lg-0 ml-lg-4 mr-lg-1"
        >
          <!-- Search bar with button -->
          <b-container class="justify-content-center" id="nav-search-bar">
            <b-form-input
              class="rounded-lg align-self-center w-75 mr-lg-1"
              placeholder="Search for an article"
              id="nav-search"
              icon="search"
            >
            </b-form-input>
            <b-button
              class="bg-light text-dark border-info rounded-lg my-2 my-lg-0"
              id="nav-search-submit"
              type="submit"
            >
              Search
            </b-button>
          </b-container>
          <!-- LogIn, SignUp and Profile -->
          <b-dropdown
            id="dropdown-form"
            text="Profile"
            ref="dropdown"
            class="animated w-25 ml-lg-5"
            variant="light"
          >
            <b-dropdown-form class="w-100 p-5">
              <b-form-group
                label="Email"
                label-for="dropdown-form-email"
                @submit.stop.prevent
              >
                <b-form-input
                  id="dropdown-form-email"
                  size="sm"
                  placeholder="email@example.com"
                >
                
                </b-form-input>
              </b-form-group>
              <b-form-group label="Password" label-for="dropdown-form-password">
                <b-form-input
                  id="dropdown-form-password"
                  type="password"
                  size="sm"
                  placeholder="Password"
                >
                </b-form-input>
              </b-form-group>
              <b-form-checkbox class="mb-3">Remember me</b-form-checkbox>
              <b-button variant="primary" size="md" @click="onClick"
                >Sign In</b-button
              >
            </b-dropdown-form>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button>
              New around here? Sign up
            </b-dropdown-item-button>
            <b-dropdown-item-button> Forgot Password? </b-dropdown-item-button>
          </b-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>
<script>
export default {
  methods: {
    onClick() {
      // Close the menu and (by passing true) return focus to the toggle button
      this.$refs.dropdown.hide(true);
    },
  },
};
</script>