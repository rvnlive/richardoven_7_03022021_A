<template>
  <div>
    <b-navbar class="p-md-3 navbar-transparent" fixed fluid>
      <b-button
        v-b-toggle.sidebar-left
        variant="outline-light"
        size="sm"
        class="mr-1 d-flex flex-row flex-nowrap align-items-center"
        ><b-icon icon="menu-button-wide"></b-icon>
        <p class="ml-1 m-0 menu-button-content">Menu</p></b-button
      >
      <b-button
        variant="outline-light"
        class="d-flex flex-row flex-nowrap align-items-center"
        size="sm"
        @click="toHome()"
        v-if="$router.currentRoute.path !== '/'"
      >
        <b-icon icon="house"></b-icon>
        <p class="ml-1 m-0 menu-button-content">Home</p></b-button
      >
      <div class="clearfix ml-auto">
        <b-input-group size="sm" class="ml-auto">
          <b-button
            id="logout-button"
            variant="outline-light"
            class="d-flex flex-row flex-nowrap align-items-center mr-1"
            size="sm"
            @click="logOut"
            ><b-icon icon="lock"></b-icon>
            <p class="menu-button-content ml-1 m-0">LogOut</p></b-button
          >
          <b-form-input
            id="search-input"
            type="search"
            placeholder="Search..."
          />
        </b-input-group>
      </div>
    </b-navbar>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import router from "../../router";
export default {
  methods: {
    ...mapActions(["userLogOut", "clearAllUsers"]),
    logOut() {
      this.$store.dispatch("userLogOut", "clearAllUsers").then(() => {
        router.push("/login");
      });
    },

    toHome() {
      router.push("/");
    },
  },
};
</script>
<style lang="scss">
@media (max-width: 414.98px) {
  .menu-button-content {
    display: none;
  }
  #search-input {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    width: 125px;
    -webkit-transition: all 600ms ease;
    -moz-transition: all 600ms ease;
    transition: all 600ms ease;
    float: right;
    &:hover,
    &:focus {
      box-shadow: 0 9px 30px 14px rgba(0, 0, 0, 0.534);
    }
  }
}
@media only screen and (min-width: 415px) {
  #search-input {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    width: 200px;
    -webkit-transition: all 600ms ease;
    -moz-transition: all 600ms ease;
    transition: all 600ms ease;
    float: right;
    &:hover,
    &:focus {
      box-shadow: 0 9px 30px 14px rgba(0, 0, 0, 0.534);
      width: 350px;
    }
  }
}
</style>