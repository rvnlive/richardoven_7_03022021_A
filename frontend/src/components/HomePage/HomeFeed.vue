<template>
  <div class="mt-3 mt-md-1 ml-auto mr-auto w-100">
    <!-- Post Input -->
    <b-container class="rounded shadow pb-1 w-75 mt-2" fluid>
      <b-form @submit="submitPost">
        <b-form-group>
          <div class="mw-50 mt-3">
            <p
              class="lead font-weight-normal text-light m-0 text-left"
              v-if="userDetails"
            >
              Welcome {{ userDetails.firstname }}
            </p>
            <hr class="mt-1 bg-light w-75 float-left" />
          </div>
          <b-form-textarea
            no-resize
            placeholder="Share something with us..."
            v-model="postText"
            id="postText"
          ></b-form-textarea>
          <b-container
            class="m-0 p-0 d-flex flex-column justify-content-center"
          >
            <div class="flex-row">
              <b-button
                v-b-toggle.collapse-1
                variant="outline-light"
                size="sm"
                class="float-left mt-3"
                ><b-icon icon="file-image"></b-icon
              ></b-button>
              <b-collapse id="collapse-1" class="float-left float-md-none ml-md-5 mw-75 mt-3">
                <b-card class="mw-75">
                  <b-form-file
                    name="image"
                    ref="fileInput"
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
            <div class="flex-row">
              <b-button
                variant="outline-light"
                type="submit"
                class="ml-auto mr-auto mt-3"
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

// :state="imageAltState"
// :state="Boolean(upload.file)"

<script>
import { mapActions, mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      userid: this.$store.getters.userDetails.userid,
      postText: "",
      imageAlt: "",
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters.userDetails;
    },
    imageAltState() {
      return this.imageAlt.length > 2 ? true : false;
    },
  },
  methods: {
    ...mapActions(["userPost"]),

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
          width: '280px'
        });
      } else {
        this.$store
          .dispatch("userPost", { formData })
          .then(() => {
                  this.postText = "";
      this.imageAlt = "";
      this.$refs["fileInput"].reset();
            return this.$swal({
              icon: "success",
              title: "Nice one!",
              text: "Post has been successfully created!",
              showConfirmButton: false,
              timer: 1250,
              width: '280px'
            });
          })
          .catch((error) => {
            return this.$swal({
              icon: "error",
              title: "OopsyDaisy...",
              text: "Please, check your contents and try again! " + error,
              width: '280px'
            });
          });
      }
    }
  },
};
</script>
<style lang="scss" scoped>
// $extra-shadow: 0 0 10px 10px rgba(43, 43, 43, 0.336);
</style>