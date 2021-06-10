<template>
  <div>
    <SideBar />
    <TopBar />
    <b-button
      v-b-toggle.sidebar-right
      variant="outline-light"
      class="d-flex flex-row align-items-center float-right border-0 mr-0 pr-3"
      ><b-icon
        icon="arrow-bar-left"
        class="mr-3"
        alt="Left pointing arrow"
      ></b-icon>
      <b-icon icon="person-lines-fill" alt="Human figure"></b-icon
    ></b-button>
    <UsersBar />
    <b-container fluid class="d-flex justify-content-center mb-5">
      <b-container fluid class="d-flex justify-content-center m-0 p-0 animate">
        <HomeFeed></HomeFeed>
      </b-container>
    </b-container>
        <b-container fluid class="d-flex justify-content-center mb-5">
      <b-container fluid class="d-flex justify-content-center m-0 p-0 animate">
        <HomeTimeline />
      </b-container>
    </b-container>
  </div>
</template>
<script>
import SideBar from "../components/Main/SideBar";
import UsersBar from "../components/HomePage/UserSideBar";
import TopBar from "../components/Main/TopBar";
import HomeFeed from "../components/HomePage/HomeFeed";
import HomeTimeline from "../components/HomePage/HomeTimeline";
export default {
  components: {
    SideBar,
    UsersBar,
    TopBar,
    HomeFeed,
    HomeTimeline
  },
};
</script>