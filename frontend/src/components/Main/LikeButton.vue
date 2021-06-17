<template>
  <div>
    <b-container class="d-flex flex-row">
          <b-button
            size="sm"
            variant="outline-secondary"
            @click="takeALike"
            v-if="isLiked"
            ><b-icon icon="hand-thumbs-up" class="mr-1"></b-icon
            >{{ likeLength }} Like</b-button
          >
          <b-button size="sm" variant="outline-light" @click="giveALike" v-else-if="!isLiked"
            ><b-icon icon="hand-thumbs-up" class="mr-1"></b-icon
            >{{ likeLength }} Like</b-button
          >
    </b-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeUserID: this.$store.getters.userDetails.userid,
    };
  },
  computed: {
    ...mapGetters(["getAllLikes", "userDetails"]),
    userID() {
      return this.userDetails.userid;
    },
    likeLength() {
      return this.getAllLikes.length;
    },
    listAllLikes() {
      return this.getAllLikes;
    },
    isLiked() {
      return this.listAllLikes.find(
        (user) => user.userid === this.activeUserID
      );
    },
  },
  methods: {
    ...mapActions(["giveLike", "takeLike"]),
    giveALike() {
      const userid = this.$store.getters.userDetails.userid;
      const id = this.$store.getters.loadChosenPost[0].postid;
      this.$store
        .dispatch("giveLike", { userid, id })
        .then(() => {
          return this.$swal({
            icon: "success",
            title: "Nice one!",
            showConfirmButton: false,
            timer: 1250,
            width: "280px",
          });
        })
        .catch((error) => console.log(error));
    },
    takeALike() {
      const userid = this.$store.getters.userDetails.userid;
      const id = this.$store.getters.loadChosenPost[0].postid;
      this.$store
        .dispatch("takeLike", { userid, id })
        .then(() => {
          return this.$swal({
            icon: "success",
            title: "Nice one!",
            showConfirmButton: false,
            timer: 1250,
            width: "280px",
          });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>