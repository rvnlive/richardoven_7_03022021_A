<template>
  <div>
    <SideBar />
    <TopBar />
    <b-button
      v-b-toggle.sidebar-right
      variant="outline-light"
      class="
        d-flex
        flex-row
        align-items-center
        float-right
        border-0
        mr-0
        mt-1
        pr-3
      "
      @click="reloadUsers"
      ><b-icon
        icon="arrow-bar-left"
        class="mr-3"
        alt="Left pointing arrow"
      ></b-icon>
      <b-icon icon="person-lines-fill" alt="Human figure"></b-icon
    ></b-button>
    <UsersBar />
    <b-container class="mb-1 animate">
      <PostInput />
    </b-container>
    <b-container
      fluid
      class="d-flex justify-content-center p-0 animate"
      v-if="!onEmptyContent"
    >
    </b-container>
    <b-container fluid class="d-flex justify-content-center p-0 animate" v-else>
      <HomeTimeline />
    </b-container>
  </div>
</template>
<script>
import SideBar from "../components/Main/SideBar";
import UsersBar from "../components/HomePage/UserSideBar";
import TopBar from "../components/Main/TopBar";
import PostInput from "../components/HomePage/PostInput";
import HomeTimeline from "../components/HomePage/HomeTimeline";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    SideBar,
    UsersBar,
    TopBar,
    PostInput,
    HomeTimeline,
  },
  mounted() {
    this.loadAllPosts;
    return this.loadAllUserContent;
  },
  created() {
    return this.loadAllUserContent;
  },
  computed: {
    ...mapGetters(["loadAllUserContent"]),
    onEmptyContent() {
      return this.loadAllUserContent.length;
    },
  },
  methods: {
    ...mapActions(["loadAllUser"]),
    reloadUsers() {
      return this.$store.dispatch("loadAllUser");
    },
  },
};
</script>