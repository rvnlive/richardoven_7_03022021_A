<template>
  <b-container class="d-flex flex-column align-items-center m-0 p-0" fluid>
    <b-container
      class="
        btn btn-sm
        m-0
        p-0
        mb-2
        w-50
        justify-content-center
        rounded-lg
        bg-secondary
      "
      @click="onRefresh"
    >
      <p class="lead text-light m-0">Refresh for new posts</p>
    </b-container>
    <div class="feedline ml-3">
      <TimelinePost class="mt-5 animate" />
    </div>
  </b-container>
</template>
<script>
import TimelinePost from "./TimelinePost.vue";
import { mapActions } from "vuex";
export default {
  components: { TimelinePost },
  data() {
    return {};
  },
  mounted() {
    return this.loadAllPosts();
  },
  computed: {},
  methods: {
    ...mapActions(["loadAllPosts"]),
    onRefresh() {
      this.$store.dispatch("loadAllPosts").then(() => {
        return this.$swal({
          icon: "success",
          title: "Done...",
          text: "Everything up to date!",
          showConfirmButton: false,
          timer: 750,
          width: "280px",
        });
      });
    },
  },
};
</script>
<style lang="scss">
@media only screen and (min-width: 768px) {
  .feedline {
    position: relative;
    padding-bottom: 40px;
    &:before,
    &:after {
      background-color: grey;
      bottom: 20px;
      content: "";
      display: block;
      position: absolute;
    }
    &:before {
      left: 49px;
      top: 20px;
      width: 2px;
    }
    &:after {
      left: 47px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }
}
@media only screen and (max-width: 767.99px) {
  .feedline {
    position: relative;
    padding-bottom: 40px;
    &:before,
    &:after {
      background-color: grey;
      bottom: 20px;
      content: "";
      display: block;
      position: absolute;
    }
    &:before {
      left: 2.35rem;
      top: 20px;
      width: 2px;
    }
    &:after {
      left: 2.25rem;
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }
}
</style>