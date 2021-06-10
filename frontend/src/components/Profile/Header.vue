<template>
  <div>
    <b-jumbotron fluid bg-variant="transparent" class="border-0"></b-jumbotron>
    <b-container class="mt-5 mt-lg-3 animate">
      <div class="row justify-content-center">
        <div class="col-xl-11">
          <div class="widecard-background shadow-profile rounded-lg shadow-lg">
            <div class="row d-flex align-items-center">
              <div class="col-12 d-flex justify-content-center">
                <div class="image-default">
                  <b-img
                    class="rounded-circle"
                    :src="defaultProfile"
                    alt="Profile image"
                  />
                </div>
                <div class="mt-5 mb-3">
                  <div class="h2" v-if="userDetails">
                    {{ userDetails.firstname + " " + userDetails.lastname }}
                  </div>
                  <p class="lead font-weight-lighter">{{ shortBio }}</p>
                  <b-button
                    variant="outline-primary"
                    class="border-secondary shadow-lg"
                    rounded
                    @click="deleteProfile"
                  >
                    <p class="d-inline">Delete profile</p>
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
import defaultProfile from "../../assets/Images/defaultProfileImage.webp";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      shortBio: "I'm an egg. Testing egg, so No panic!",
      defaultProfile: defaultProfile,
    };
  },
  computed: {
    userDetails() {
      return this.$store.getters.userDetails;
    },
  },
  methods: {
    ...mapActions(["userDelete"]),
    deleteProfile() {
      try {
        this.$swal({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#6d52cfce",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.value) {
            this.$swal({
              icon: "success",
              title: ":(",
              text: "Hope to see you again soon!",
              showConfirmButton: false,
              timer: 1250,
            });
            const userid = this.$store.getters.userDetails.userid;
            this.userDelete(userid);
            this.$router.push("/login");
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$extra-shadow: 0 0 10px 10px rgba(43, 43, 43, 0.336);

.jumbotron {
  margin: 0;
  color: #fff !important;
  height: 200px;
  position: relative;
  padding: 0;
}

.container-fluid {
  padding: 30px 30px;
}

.shadow-profile {
  margin-top: -140px;
  position: relative;
  &:before {
    content: "";
    background: rgba(255, 255, 255, 0.6);
    height: 20px;
    width: 90%;
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 4px 4px 0 0;
  }
  &:after {
    content: "";
    background: rgba(255, 255, 255, 0.3);
    height: 20px;
    width: 80%;
    position: absolute;
    top: -40px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 4px 4px 0 0;
  }
}

.widecard-background {
  background: #fff;
  border-radius: 0;
  border: none;
  margin-bottom: 30px;
}

.image-default img {
  width: 120px;
  position: absolute;
  top: -80px;
  left: 0;
  right: 0;
  margin: 0 auto;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 1);
  z-index: 10;
}
</style>