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
        :src=lightLogo
        width="65%"
        alt="Groupomania's brand logo"
        class="mb-lg-4"
        v-on:click="home()"
      />
      <!-- User Profile Picture -->
      <div id="user-card">
      <b-container class="mt-4 mb-4 mb-lg-5 pt-2 pb-3 border rounded-lg shadow-lg" v-on:click="userProfile()">
        <b-img
          class="shadow-lg position-relative"
          width="150px"
          center
          thumbnail
          fluid
          rounded="circle"
          v-bind:src=user.profileImage
        />
        <span class="badge bg-gradient-success" id="status-badge"><b-icon icon="person-check-fill"></b-icon></span>
        <b-container class="mt-3 pb-5">
            <p class="h3">{{ user.fullName }}</p>
            <hr class="solid bg-light mt-0" width="75%">
            <p class="h6">{{ user.shortBio }}</p>
            <p class="h6 col-4 mt-2 float-left">Friends {{ user.numberOfFriends }}</p>
            <p class="h6 col-4 mt-2 float-right">Groups {{ user.numberOfGroupsJoined }}</p>
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
          class="col-4 pt-2 pb-2 border shadow-lg float-left"
          rounded
        >
          <b-icon class="h5 align-middle" icon="images"></b-icon>
          <p class="d-inline">Photos</p>
        </b-button>
        <b-button
          variant="outline-light"
          class="col-4 pt-2 pb-2 ml-auto border shadow-lg float-right"
          rounded
        >
          <b-icon class="h5 align-middle" icon="person-lines-fill"></b-icon>
          <p class="d-inline">Friends</p>
        </b-button>
      </b-container>
      <!-- Row 3 -->
      <b-container class="row mt-4 ml-auto mr-auto">
        <b-button
          variant="outline-light"
          class="col-4 pt-2 pb-2 border shadow-lg float-left"
          rounded
        >
          <b-icon class="h5 align-middle" icon="people-fill"></b-icon>
          <p class="d-inline">Groups</p>
        </b-button>
        <b-button
          variant="outline-light"
          class="col-4 pt-2 pb-2 ml-auto border shadow-lg float-right"
          rounded
        >
          <b-icon class="h5 align-middle" icon="chat-text-fill"></b-icon>
          <p class="d-inline">Forums</p>
        </b-button>
      </b-container>
    </b-container>
    <a class="h6 text-dark" href="https://github.com/rvnlive/" target="_blank">Developed by Richard Oven</a>
  </b-sidebar>
</template>
<script>
import whiteLogo from '../../assets/Images/edited/icon-left-font-monochrome-white.png'
import blackLogo from '../../assets/Images/edited/icon-left-font-monochrome-black.png'
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      lightLogo: whiteLogo,
      darkLogo: blackLogo
    }
  },
    computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
    methods: {
        home(){
          this.$router.push( '/Home' )
        },
        userProfile(){
            this.$router.push( '/Profile' )
        }
    },
}
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