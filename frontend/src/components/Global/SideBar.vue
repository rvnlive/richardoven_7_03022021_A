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
    <b-container class="px-3 pb-4">
      <img
        src="../../assets/edited/icon-left-font-monochrome-white.png"
        width="65%"
        alt="Groupomania's brand logo"
        class="mb-lg-4"
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
          src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=798&q=80"
        />
        <span class="badge bg-gradient-success" id="status-badge">online</span>
        <b-container class="mt-3 pb-5">
            <p class="h3">{{ name }}</p>
            <hr class="solid bg-light mt-0" width="75%">
            <p class="h6">{{ shortBio }}</p>
            <p class="h6 col-4 mt-2 float-left">Friends {{ numberOfFriends }}</p>
            <p class="h6 col-4 mt-2 float-right">Groups {{ numberOfGroupsJoined }}</p>
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
          <p class="d-inline">Profile</p>
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
    <a class="h6 fixed-bottom text-dark" href="https://github.com/rvnlive/" target="_blank">Developed by Richard Oven</a>
  </b-sidebar>
</template>
<script>
export default {
    methods: {
        userProfile(){
            this.$router.push( '/Profile' )
        }
    },
    props: {
        name: {
            type: String,
            default: 'John Doe'
        },
        shortBio: {
            type: String,
            default: 'This is me, noone else.'
        },
        numberOfFriends: {
            type: Number,
            default: 0
        },
        numberOfGroupsJoined: {
            type: Number,
            default: 0
        }
    }
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