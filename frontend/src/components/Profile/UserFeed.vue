<template>
  <div class="p-md-3">
    <!-- Post Input -->
    <b-container class="rounded shrinked">
      <b-form-group class="">
        <p class="lead font-weight-normal text-light m-0 text-left">
          Share a post
        </p>
        <hr class="mt-2 bg-light w-25 float-left" />
        <b-form-textarea
          no-resize
          placeholder="What are you thinking?"
          size="sm"
          id="postTextContent"
        ></b-form-textarea>
        <b-button variant="outline-light" type="submit" class="mt-3"
          >Post</b-button
        >
      </b-form-group>
    </b-container>
    <hr class="mt-4 bg-light w-75" />
    <!--===================================================-->

    <!-- feedline -->
    <div class="feedline">
      <b-container
        class="mb-5 mt-4 w-75 justify-content-center rounded-lg bg-secondary"
      >
        <p class="lead text-light">Now</p>
      </b-container>

      <!-- Individual Post Starts HERE -->
      <div class="post-on-feed">
        <div class="feedline-postinfo">
          <b-avatar size="lg" rounded="lg" :src="user.profileImage"> </b-avatar>
          <div class="bg-secondary rounded-lg shadow-lg mt-2 text-light">
            {{ date1 }}
          </div>
        </div>
        <div class="border border-secondary rounded post-marking">
          <p>
            <a href="#" class="text-light">{{ user.fullName }}</a> updated the profile
            picture.
          </p>
          <div class="img-holder">
            <b-img :key="user.id" :src="user.profileImage" alt="Image" thumbnail class="w-25" />
          </div>
        </div>
      </div>
      <!-- Individual Post Ends HERE -->

      <!-- feedline content/session separator -->
      <b-container
        class="mb-5 w-75 justify-content-center rounded-lg bg-secondary"
      >
        <p class="lead text-light">Yesterday</p>
      </b-container>

      <!-- Individual Post Starts HERE -->
      <div class="post-on-feed">
        <div class="feedline-postinfo">
          <b-avatar size="lg" rounded="lg" :src="user.profileImage"> </b-avatar>
          <div class="bg-secondary rounded-lg shadow-lg mt-2 text-light">
            {{ date2 }}
          </div>
        </div>
        <div class="border border-secondary rounded post-marking">
          <p>
            <a href="#" class="text-light">{{ user.fullName }}</a> updated the Biography.
          </p>
          <div class="img-holder">
            <p class="lead text-light">{{ user.longBio }}</p>
          </div>
        </div>
      </div>
      <!-- Individual Post Ends HERE -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  props: {
    uploadDate: {
      type: String,
      default: "13/03/2021",
    },
    date1: { type: String, default: "30mins ago" },
    date2: { type: String, default: "12 hours ago" },
  },
};
</script>
<style lang="scss" scoped>
$secondary: rgba(224, 224, 224, 0.233);
.shrinked {
  max-width: 90vw;
}
@media only screen and (min-width: 768px) {
    .shrinked{
    max-width: 50vw;
    }
}

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

@media only screen and (max-width: 768px) {
  .small-screen-width {
    width: 100vw;
  }
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
    left: 2rem;
    top: 20px;
    width: 2px;
  }
  &:after {
    left: 1.9rem;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  }
}

.feedline-postinfo {
  width: auto;
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
  margin-left: 5rem;
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