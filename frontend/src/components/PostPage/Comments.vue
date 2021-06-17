<template>
  <div>
    <b-collapse id="collapsing-comments" class="mt-2">
      <div
        v-for="comment in onLoadComments.comments"
        :userid="comment.user.userid"
        :commentid="comment.commentid"
        :key="comment.commentid"
      >
        <b-container class="d-flex flex-row align-items-center mb-4 p-0">
          <p class="text-light m-0 mr-2 p-0 w-25">
            {{ comment.user.firstname }}
            {{ comment.user.lastname }}:
          </p>
          <div
            class="
              d-flex
              flex-column
              align-items-center
              justify-content-center
              w-100
              ml-auto
              mr-2
              p-0
              m-0
              border border-secondary
              rounded
              bg-secondary
              post-marking
            "
          >
            <p class="h6 text-light m-0 p-0 pt-2 mb-2">
              {{ comment.comment }}
            </p>
            <span class="text-light blockquote-footer ml-auto m-0 p-0 pr-1">
              {{ comment.createdat | formatDate }}
            </span>
          </div>
        </b-container>
      </div>
    </b-collapse>
    <b-form
      @submit="onCommenting"
      class="w-75 d-flex flex-row ml-auto mr-auto mb-md-5"
    >
      <b-form-group class="w-100 m-0 p-0">
        <b-form-textarea
          no-resize
          placeholder="Share your opinion with us..."
          v-model="commentInput"
          rows="1"
          max-rows="3"
          size="sm"
          id="comment"
        >
        </b-form-textarea>
      </b-form-group>
      <b-button type="submit" variant="outline-light" class="ml-1" size="sm"
        >Submit</b-button
      >
    </b-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      commentInput: "",
      userid: this.$store.getters.userDetails.userid,
      postid: this.$store.getters.loadChosenPost[0].postid,
    };
  },
  mounted() {
    this.loadComments(this.postid);
  },
  created() {
    this.$store.watch((state) => {
      return this.$store.state.allComments;
    });
  },
  computed: {
    ...mapGetters(["loadChosenPost", "getAllComment"]),
    onLoadComments() {
      return this.$store.getters.getAllComment;
    },
  },
  methods: {
    ...mapActions(["createUserComment", "loadComments"]),
    onCommenting(event) {
      event.preventDefault();
      if (!this.commentInput) {
        return this.$swal({
          icon: "error",
          title: "OopsyDaisy...",
          text: "Please, enter a comment and try again! ",
          width: "280px",
        });
      } else {
        const { commentInput, userid, postid } = this;
        this.$store
          .dispatch("createUserComment", { commentInput, userid, postid })
          .then((res) => {
            if (res.status !== 200) {
              return this.$swal({
                icon: "error",
                title: "Nope!",
                text: "Please try again!",
                showConfirmButton: false,
                timer: 1250,
                width: "280px",
              });
            } else if (res.status === 200) {
              this.commentInput = "";

              return this.$swal({
                icon: "success",
                title: "Nice one!",
                text: "Comment has been successfully shared!",
                showConfirmButton: false,
                timer: 1250,
                width: "280px",
              });
            }
          })
          .catch((error) => {
            return this.$swal({
              icon: "error",
              title: "OopsyDaisy...",
              text: "Please, check your contents and try again! " + error,
              width: "280px",
            });
          });
      }
    },
  },
};
</script>