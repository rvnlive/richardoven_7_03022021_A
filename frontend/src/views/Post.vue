<template>
  <div>
    <SideBar></SideBar>
    <TopBar />
    <b-container>
      <b-container class="mt-4" v-if="loadPost.uploads.length === 0">
        <p
          class="
            h3
            text-light
            bg-secondary
            rounded-lg
            p-1
            border border-secondary
          "
        >
          {{ loadPost.texts[0].textcontent }}
        </p>
      </b-container>
      <b-container class="mt-4" v-else-if="loadPost.texts.length === 0">
        <b-img
          :src="loadPost.uploads[0].imagesrc"
          :alt="loadPost.uploads[0].imagealt"
          class="mw-100 border border-light rounded-lg shadow-lg mt-2"
          v-b-modal.modal-img-center
        />
        <b-modal
          id="modal-img-center"
          centered
          hide-footer
          hide-header
          body-bg-variant="primary"
        >
          <b-img
            :src="loadPost.uploads[0].imagesrc"
            :alt="loadPost.uploads[0].imagealt"
            class="w-100"
          />
        </b-modal>
      </b-container>
      <b-container class="mt-4" v-else>
        <p class="h3 text-light">{{ loadPost.texts[0].textcontent }}</p>
        <b-img
          :src="loadPost.uploads[0].imagesrc"
          :alt="loadPost.uploads[0].imagealt"
          class="w-100 border border-light rounded-lg shadow-lg mt-2"
          v-b-modal.modal-img-center
        />
        <b-modal
          id="modal-img-center"
          centered
          hide-footer
          hide-header
          body-bg-variant="primary"
        >
          <b-img
            :src="loadPost.uploads[0].imagesrc"
            :alt="loadPost.uploads[0].imagealt"
            class="w-100"
          />
        </b-modal>
      </b-container>
      <b-container class="d-flex flex-row mt-4 animate">
        <div class="float-left text-light">
          Shared by
          <span class="h5"
            >{{ loadPost.user.firstname }} {{ loadPost.user.lastname }}</span
          ><br />
          <p class="blockquote-footer mt-1 float-left text-light">
            on {{ loadPost.updatedat | formatDate }}
          </p>
        </div>
      </b-container>
    </b-container>
    <hr class="mt-1 bg-light w-100" />
    <b-container class="m-0 d-flex flex-row flex-nowrap">
      <LikeButton />
      <b-button
        v-b-toggle.collapsing-comments
        variant="outline-light"
        size="sm"
        v-if="!commentLength"
        >0 Comment</b-button
      >
      <b-button
        v-b-toggle.collapsing-comments
        variant="outline-light"
        size="sm"
        v-else
        >{{ commentLength.length }} Comment(s)</b-button
      >
    </b-container>
    <hr class="mt-3 bg-light w-100" />
    <Comments />
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import SideBar from "../components/Main/SideBar";
import TopBar from "../components/Main/TopBar";
import LikeButton from "../components/Main/LikeButton.vue";
import Comments from "../components/PostPage/Comments.vue";
export default {
  components: {
    SideBar,
    TopBar,
    LikeButton,
    Comments,
  },
  data() {
    return {
      Media: {
        alt: "",
        src: "",
      },
    };
  },
  created() {
    this.getAllComment;
    this.$store.watch((state) => {
      return this.$store.state.allComments;
    });
    this.$store.watch((state) => {
      return this.$store.state.allLikes;
    });
    return this.postView();
  },
  computed: {
    ...mapGetters(["loadChosenPost", "getAllComment"]),
    loadPost() {
      return this.$store.getters.loadChosenPost[0];
    },
    commentLength() {
      return this.getAllComment.comments;
    },
  },
  methods: {
    ...mapActions(["onPostview", "loadAllLikes"]),
    postView() {
      const userid = this.$store.getters.userDetails.userid;
      const id = this.loadPost.postid;
      this.$store
        .dispatch("onPostview", { userid, id })
        .then(() => {
          const id = this.loadPost.postid;
          return this.$store.dispatch("loadAllLikes", id);
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>