<template>
  <div class="animate">
    <div
      v-for="post in limitedPostList"
      :userid="post.user.userid"
      :postid="post.postid"
      :firstname="post.user.firstname"
      :lastname="post.user.lastname"
      :key="post.postid"
      @click="goToPost(post.postid)"
      variant="outline-primary"
      class="
        d-flex
        align-content-center
        text-primary
        mt-2
        border-secondary
        animate
      "
    >
      <!-- Individual Post Starts HERE -->
      <div class="post-on-feed w-100">
        <div class="feedline-postinfo">
          <div
            class="bg-secondary rounded-lg shadow-lg mt-2 pl-1 pr-1 text-light"
          >
            Posted on {{ post.createdat | formatDate }}
          </div>
          <template>
            <div class="bg-secondary p-0 m-0 mt-2 rounded w-50 ml-auto mr-auto">
              <p class="text-light m-0 p-0" v-if="isRead(post)">Read</p>
              <p class="text-light m-0" v-else>Unread</p>
            </div>
          </template>
        </div>
        <div class="border border-secondary rounded post-marking">
          <p class="text-light">
            {{ post.user.firstname }} {{ post.user.lastname }} shared a post
          </p>
          <!-- for Image content -->
          <template>
            <div
              class="img-holder mb-2"
              v-for="upload in post.uploads"
              :key="upload.uploadid"
            >
              <b-img
                :src="upload.imagesrc"
                :alt="upload.imagealt"
                thumbnail
                class="w-75"
              />
            </div>
          </template>
          <!-- For text content -->
          <template>
            <div v-for="text in post.texts" :key="text.textid">
              <p class="text-light bg-secondary rounded-lg lead">
                {{ text.textcontent }}
              </p>
            </div>
          </template>
        </div>
      </div>
      <!-- Individual Post Ends HERE -->
    </div>
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
      v-if="
        listingLimit < loadAllUserContent.length ||
        loadAllUserContent.length > listingLimit
      "
      @click="listingLimit += 5"
    >
      <p class="lead text-light m-0">Show more</p>
    </b-container>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      postid: this.$store.getters.loadAllUserContent.postid,
      listingLimit: 5,
    };
  },
  mounted() {
    return this.$store.getters.loadAllUserContent;
  },
  computed: {
    ...mapGetters(["loadAllUserContent", "getAllLikes"]),
    limitedPostList() {
      return this.loadAllUserContent.filter(
        (post, index) => index < this.listingLimit
      );
    },
  },
  created() {
    this.$store.watch((state) => {
      return this.$store.state.allUserContent;
    });
    this.$store.watch((state) => {
      return this.$store.state.allLikes;
    });
  },
  methods: {
    ...mapActions(["loadOnePost"]),
    goToPost(id) {
      this.$store
        .dispatch("loadOnePost", { id })
        .then(() => {
          return this.$router.push({ path: "post", query: { id } });
        })
        .catch((error) => console.log(error));
    },
    isRead(post) {
      const userId = this.$store.getters.userDetails.userid;
      return post.postviews.find((item) => item.userid === userId);
    },
  },
};
</script>
<style lang="scss">
$secondary: rgba(224, 224, 224, 0.233);
.shrinked {
  max-width: 90vw;
}
@media only screen and (min-width: 768px) {
  .shrinked {
    max-width: 50vw;
  }
}
.feedline-postinfo {
  width: 100px;
  float: left;
  text-align: center;
  padding-bottom: 15px;
}
.post-on-feed {
  margin-bottom: 50px;
  margin-top: 5px;
  position: relative;
  clear: both;
}
.post-marking {
  margin-left: 9rem;
  margin-right: 9rem;
  padding: 10px;
  position: relative;
  min-height: 50px;
  &:before,
  &:after {
    content: "";
    display: block;
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
  }
  &:before {
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-right: 10px solid $secondary;
    margin: 15px 0 0 -10px;
  }
}
@media only screen and (max-width: 767.99px) {
  .small-screen-width {
    width: 95vw;
  }

  .feedline-postinfo {
    display: flex;
    flex-flow: column;
    float: left;
    font-size: 0.8rem;
    text-align: center;
    padding-bottom: 15px;
    margin-left: -0.75rem;
  }
  .post-on-feed {
    margin-bottom: 50px;
    margin-top: 5px;
    position: relative;
    clear: both;
  }
  .post-marking {
    margin-left: 6rem;
    margin-right: 0.5rem;
    padding: 10px;
    position: relative;
    min-height: 50px;
    &:before,
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      left: 0;
      top: 0;
    }
    &:before {
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-right: 10px solid $secondary;
      margin: 15px 0 0 -10px;
    }
  }
}
</style> 