<template>
  <b-sidebar
    id="sidebar-left"
    text-variant="light"
    bg-variant="gradient-primary"
    backdrop-variant="dark"
    backdrop
    left
    shadow
  >
    <b-container class="px-3 pb-5">
      <img
        :src="lightLogo"
        width="65%"
        alt="Groupomania's brand logo"
        class="mb-lg-5"
      />
      <!-- User Profile Picture -->
      <div id="user-card">
        <b-container
          class="mt-5 mb-5 mb-lg-5 pt-2 pb-2 border rounded-lg shadow-lg"
          v-on:click="userProfile()"
        >
          <b-img
            :src="defaultProfile"
            class="shadow-lg position-relative mt-2"
            width="150px"
            center
            thumbnail
            fluid
            rounded="circle"
          ></b-img>
          <b-container class="mt-3">
            <p class="h3" v-if="userDetails">
              {{ userDetails.firstname }} {{ userDetails.lastname }}
            </p>
          </b-container>
        </b-container>
      </div>
      <!-- Sidebar Menu -->
      <!-- Row 1 -->
      <b-container class="row mt-lg-5 pt-2 pt-lg-3 ml-auto mr-auto">
        <b-button
          variant="outline-light"
          class="col-4 pt-2 pb-2 border shadow-lg float-left"
          rounded
        >
          <b-icon class="h5 align-middle" icon="person-circle"></b-icon>
          <p class="d-inline">Settings</p>
        </b-button>
        <b-button
          variant="outline-light"
          class="col-4 pt-2 pb-2 ml-auto border shadow-lg float-right"
          rounded
        >
          <b-icon class="h5 align-middle" icon="envelope"></b-icon>
          <p class="d-inline">Mailbox</p>
        </b-button>
      </b-container>
      <!-- Row 2 -->
      <b-container class="row mt-4 ml-auto mr-auto">
        <b-button
          variant="outline-light"
          class="col-3 pt-2 pb-2 border shadow-lg float-left"
          rounded
        >
          <b-icon class="h5 align-middle" icon="images"></b-icon>
          <p class="d-inline">Photos</p>
        </b-button>
        <b-button
          variant="outline-light"
          class="col-3 pt-2 pb-2 ml-auto border shadow-lg float-right"
          rounded
          @click="usersList()"
        >
          <b-icon class="h5 align-middle" icon="person-lines-fill"></b-icon>
          <p class="d-inline">Users</p>
        </b-button>
      </b-container>
    </b-container>
    <a class="h6 text-dark" href="https://github.com/rvnlive/" target="_blank"
      >Developed by Richard Oven</a
    >
  </b-sidebar>
</template>
<script>
import whiteLogo from "../../assets/Images/edited/icon-left-font-monochrome-white.png";
import blackLogo from "../../assets/Images/edited/icon-left-font-monochrome-black.png";
import defaultProfile from "../../assets/Images/defaultProfileImage.webp";

export default {
  data() {
    return {
      lightLogo: whiteLogo,
      darkLogo: blackLogo,
      defaultProfile: defaultProfile,
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters.userDetails;
    },
  },
  methods: {
    userProfile() {
      const userid = this.$store.getters.userDetails.userid;
      this.$router.push({ path: "profile", query: { user: userid } });
    },
    usersList() {
      this.$router.push('/users')
    }
  },
};
</script>
<style lang="scss">
#user-card {
  transition: all 500ms ease-in-out;
  &:hover {
    box-shadow: 0 0 10px 10px rgba(37, 37, 37, 0.247);
    transition: all 200ms ease-in-out;
    cursor: pointer;
  }
}
</style>