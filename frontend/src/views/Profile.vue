<template>
  <div>
    <SideBar />
    <TopBar />
    <ProfileHeader />
    <b-container class="p-0 border border-secondary rounded-lg shadow-lg mb-5 animate">
      <b-container class="d-flex flex-column flex-md-row p-0 mt-3 mt-md-5">
        <b-container class="p-0"><UserFeed /></b-container>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import SideBar from "../components/Main/SideBar";
import TopBar from "../components/Main/TopBar";
import ProfileHeader from '../components/Profile/Header';
import UserFeed from '../components/Profile/UserFeed';
export default {
  components: {
    SideBar,
    TopBar,
    ProfileHeader,
    UserFeed
  },
  data() {
    return {
      text: "",
    };
  },
  props: {
  },
};
</script>