<template>
  <div>
    <SideBar></SideBar>
    <TopBar />
    <ProfileHeader></ProfileHeader>
    <b-container
      class="border border-secondary rounded-lg shadow-lg mb-2 animate"
    >
      <UserFeed />
    </b-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SideBar from "../components/Main/SideBar";
import TopBar from "../components/Main/TopBar";
import ProfileHeader from "../components/Profile/Header";
import UserFeed from "../components/Profile/UserFeed";
export default {
  components: {
    SideBar,
    TopBar,
    ProfileHeader,
    UserFeed,
  },
  data() {
    return {
      text: "",
    };
  },
};
</script>