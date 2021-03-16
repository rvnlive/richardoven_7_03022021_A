<template>
  <div>
    <SideBar />
    <TopBar />
    <b-container fluid class="p-0 m-0 mt-3">
    <b-container class="d-flex justify-content-center m-0 p-0 animate">
      <HomeFeed />
    </b-container>
    <!-- <b-container class="col-3 p-0 animate">
      <MembersSidebar />
    </b-container> -->
    </b-container>
  </div>
</template>
<script>
import SideBar from "../components/Main/SideBar";
import TopBar from "../components/Main/TopBar";
import HomeFeed from "../components/HomePage/HomeFeed";
// import MembersSidebar from "../components/HomePage/MembersSidebar";
export default {
  components: {
    SideBar,
    TopBar,
    HomeFeed,
    // MembersSidebar,
  },
};
</script>