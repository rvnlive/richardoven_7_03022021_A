<template>
  <b-container class="bg-info sticky-top" fluid>
    <b-navbar
    role="navigation"
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
        <path-dropdown />
        <b-navbar-nav class="w-100 justify-content-center align-content-center mt-3 mt-lg-0 ml-lg-4 mr-lg-1">
        <!-- Search bar with button -->
        <search-bar />
        <!-- LogIn, SignUp and Profile -->
        <user-profile />
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </b-container>
</template>
<script>
import PathDropdown from './Navbar/PathDropdown'
import SearchBar from './Navbar/SearchBar'
import UserProfile from './Navbar/UserProfile'
export default {
components: {
  PathDropdown,
  SearchBar,
UserProfile
  },
  methods: {
    onClick() {
      // Close the menu and (by passing true) return focus to the toggle button
      this.$refs.dropdown.hide(true);
    },
  },
};
</script>
<style lang="scss">
// Styling the Search bar input field
$primary: #3e528ace;
$info: rgb(216, 216, 216);
#nav-search {
    background-color: $primary;
    transform: scale(1);
    transition: all 500ms ease-in-out;
    &:hover {
        box-shadow: 0 3px 5px 5px rgba(77, 77, 77, 0.575) ;
        transition: all 500ms ease-in-out;
        border:1px solid grey;
        background-color: $info;
    }
    &:focus {
        border: 1px solid $primary;
        box-shadow: 0 3px 10px 10px rgba(36, 36, 36, 0.575) ;
        transition: all 200ms ease-in-out;
        background-color: white;
    }
}
#nav-search-bar {
    transform: scale(1);
    transition: all 500ms ease-in-out;
    &:hover {
        transform: scale(1.05);
        transition: all 500ms ease-in-out;
    }
    &:focus {
        transform: scale(1.05);
        transition: all 200ms ease-in-out;
    }
}
</style>