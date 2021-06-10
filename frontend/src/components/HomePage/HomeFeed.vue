<template>
  <div class="mt-3 mt-md-1 ml-auto mr-auto w-100">
    <!-- Post Input -->
    <b-container class="rounded shadow pb-1 w-75 mt-2" fluid>
      <b-form>
      <b-form-group>
        <div class="mw-50">
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
          placeholder="Share your toughts..."
          v-model="post.postText"
          id="postText"
        ></b-form-textarea>
        <b-container class="m-0 p-0 d-flex flex-column justify-content-center">
          <div class="flex-row">
            <b-button
              v-b-toggle.collapse-1
              variant="outline-light"
              size="sm"
              class="float-left mt-3"
              ><b-icon icon="file-image"></b-icon
            ></b-button>
            <b-collapse id="collapse-1" class="float-left mt-2">
              <b-card>
                <b-form-file
                  v-model="upload.file"
                  size="sm"
                  type="file"
                  :state="Boolean(upload.file)"
                  placeholder="Choose a file here..."
                  drop-placeholder="Drop file here..."
                ></b-form-file>
                <b-form-input
                  no-resize
                  placeholder="What can we see on this image?"
                  size="sm"
                  v-model="upload.imageAlt"
                  :state="imageAltState"
                  required
                  class="mt-3"
                ></b-form-input>
                <div class="mt-3">
                  Selected file: {{ upload.file ? upload.file.name : "" }}
                </div>
                <b-button
                  variant="primary"
                  class="ml-auto mr-auto mt-2"
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
              class="ml-auto mr-auto mt-2"
              @click="submitPost()"
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
import { required } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      userid: this.$store.getters.userDetails.userid,
      post: {
        postText: "",
      },
      upload: {
        file: null,
        imageAlt: "",
      },
    };
  },
  validations: {
    upload: {
      imageAlt: {
        required,
      },
    },
  },
  computed: {
    userDetails() {
      return this.$store.getters.userDetails;
    },
    imageAltState() {
      return this.upload.imageAlt.length > 2 ? true : false;
    },
  },
  methods: {
    ...mapActions(["userPost"]),

    clearFiles() {
      this.$refs["file-input"].reset();
    },

    submitPost() {
      const { userid, post, upload } = this;
      if (upload.file !== null && !upload.imageAlt) {
        return this.$swal({
          icon: "error",
          title: "OopsyDaisy...",
          text: "Add alternative text for image and try again!",
        });
      } else {
        this.$store
          .dispatch("userPost", { userid, post, upload })
          .then(() => {
            // this.resetModal()
            return this.$swal({
              icon: "success",
              title: "Nice one!",
              text: "Post has been successfully created!",
              showConfirmButton: false,
              timer: 1250,
            });
          })
          .catch((error) => {
            if (error.response.status === 400) {
              return this.$swal({
                icon: "error",
                title: "OopsyDaisy...",
                text: "Please, check your contents and try again!",
              });
            }
          });
      }
    },
    onReset() {
      event.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// $extra-shadow: 0 0 10px 10px rgba(43, 43, 43, 0.336);
</style>