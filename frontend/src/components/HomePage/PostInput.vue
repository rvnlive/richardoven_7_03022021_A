<template>
  <div class="mt-5 mt-md-1 ml-auto mr-auto w-75" fluid>
    <!-- Post Input -->
    <b-container
      class="d-flex flex-column rounded shadow pb-1 mt-2 justify-content-center"
      fluid
    >
      <b-form @submit="submitPost" class="w-100">
        <b-form-group>
          <div class="w-75 mt-3">
            <p class="lead font-weight-normal text-light m-0 text-left">
              Welcome {{ firstname }}
            </p>
            <hr class="mt-1 bg-light w-50 float-left" />
          </div>
          <b-form-textarea
            no-resize
            placeholder="Share something with us..."
            v-model="postText"
            id="postText"
          ></b-form-textarea>
          <b-container class="m-0 p-0 d-flex flex-column w-100">
            <div class="flex-row">
              <b-button
                v-b-toggle.collapse-1
                variant="outline-light"
                size="sm"
                class="float-left mt-3"
                ><b-icon icon="file-image"></b-icon
              ></b-button>
              <b-collapse
                id="collapse-1"
                class="float-left float-md-none ml-md-5 mw-75 mt-3"
              >
                <b-card class="mw-75">
                  <b-form-file
                    name="image"
                    ref="fileInput"
                    accept="image/*"
                    size="sm"
                    type="file"
                    drop-placeholder="Drop file here..."
                  ></b-form-file>
                  <b-form-input
                    no-resize
                    placeholder="What can we see on this image?"
                    size="sm"
                    v-model="imageAlt"
                    class="mt-3"
                  ></b-form-input>
                  <b-button
                    variant="primary"
                    size="sm"
                    class="ml-auto mr-auto mt-3 float-md-right mb-0"
                    @click="clearFiles()"
                    >Clear</b-button
                  >
                </b-card>
              </b-collapse>
            </div>
            <div class="d-flex flex-row flex-fill">
              <b-button
                variant="outline-light"
                type="submit"
                class="mt-3 ml-auto mr-auto"
                >Post</b-button
              >
            </div>
          </b-container>
        </b-form-group>
      </b-form>
    </b-container>
    <hr class="mt-4 bg-light w-50" />
    <!--===================================================-->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      firstname: this.$store.getters.userDetails.firstname,
      userid: this.$store.getters.userDetails.userid,
      postText: "",
      imageAlt: "",
    };
  },
  mounted() {
    return this.$store.getters.userDetails;
  },
  computed: {
    ...mapGetters(["loadAllUserContent"]),

    imageAltState() {
      return this.imageAlt.length > 2 ? true : false;
    },
  },
  methods: {
    ...mapActions(["createUserPost", "loadAllPosts"]),

    clearFiles() {
      event.preventDefault();
      this.$refs["fileInput"].reset();
    },

    submitPost(event) {
      event.preventDefault();
      const formData = new FormData();
      formData.append("post", this.postText);
      formData.append("userid", this.userid);
      formData.append("imageAlt", this.imageAlt);
      formData.append("image", this.$refs.fileInput.files[0]);

      if (
        !this.postText &&
        !this.imageAlt &&
        !this.$refs.fileInput.files.length
      ) {
        return this.$swal({
          icon: "error",
          title: "OopsyDaisy...",
          text: "Please, add content and try again! ",
          width: "280px",
        });
      } else if (!this.imageAlt && this.$refs.fileInput.files.length) {
        return this.$swal({
          icon: "error",
          title: "OopsyDaisy...",
          text: "Please, add alternartive text and try again! ",
          width: "280px",
        });
      } else {
        this.$store
          .dispatch("createUserPost", { formData })
          .then(() => {
            this.postText = "";
            this.imageAlt = "";
            this.$refs["fileInput"].reset();
            this.$swal({
              icon: "success",
              title: "Nice one!",
              text: "Post has been successfully created!",
              showConfirmButton: false,
              timer: 1250,
              width: "280px",
            });
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
<style lang="scss" scoped>
// $extra-shadow: 0 0 10px 10px rgba(43, 43, 43, 0.336);
</style>