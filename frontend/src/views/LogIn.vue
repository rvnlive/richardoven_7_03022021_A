<template>
  <div>
    <b-container class="d-flex flex-column flex-nowrap align-items-center">
      <img
        src="../assets/Images/edited/icon-left-font-monochrome-white.png"
        width="80%"
        alt="Groupomania logo"
        class="mb-3 mb-md-5 pb-md-5 mt-4"
      />
      <b-container
        class="mt-auto d-flex flex-column justify-content-center flex-md-row"
      >
        <!-- Advertisement - site function description -->
        <b-jumbotron class="mw-50 shadow-lg bg-gradient-light">
          <b-container>
            <p class="h2">
              <b-icon icon="person-circle" variant="primary"></b-icon>
            </p>
            <p>Create your profile</p>
            <p class="h2">
              <b-icon icon="envelope" variant="primary"></b-icon>
            </p>
            <p>Send messages</p>
            <p class="h2"><b-icon icon="search" variant="primary"></b-icon></p>
            <p>Check what others interested in</p>
            <p class="h2">
              <b-icon icon="people-fill" variant="primary"></b-icon>
            </p>
            <p>Build friendships</p>
          </b-container>
        </b-jumbotron>
        <!-- LogIn and Register side -->
        <b-jumbotron class="mw-50 shadow-lg bg-gradient-primary">
          <b-form class="justify-content-center m-3" @submit="logIn">
            <label class="sr-only" for="form-input-email">Email</label>
            <b-input-group-prepend class="align-items-center">
              <b-icon
                icon="envelope"
                variant="info"
                class="h1 pb-2 pr-3"
              ></b-icon>
              <b-form-input
                id="form-input-email"
                type="email"
                size="sm"
                v-model="email"
                class="mb-3 shadow-lg"
                placeholder="janedoe@email.com"
                required
                autofocus
                prepend="person-circle"
              ></b-form-input>
            </b-input-group-prepend>

            <label class="sr-only" for="form-input-password">Password</label>
            <b-input-group>
              <b-input-group-prepend class="align-items-center">
                <b-icon
                  icon="lock"
                  variant="info"
                  class="h1 pb-2 pr-3"
                ></b-icon>
              </b-input-group-prepend>
              <b-form-input
                id="form-input-password"
                :type="showPassword ? 'text' : 'password'"
                size="sm"
                v-model="password"
                placeholder="Password"
                class="mb-3 shadow-lg rounded"
                required
                @click:append="showPassword = !showPassword"
              ></b-form-input>
              <b-input-group-append
                class="align-items-center"
                @click="showPassword = !showPassword"
              >
                <b-icon
                  :icon="showPassword ? 'eye' : 'eye-slash'"
                  variant="info"
                  class="h1 pb-2 pl-3"
                ></b-icon>
              </b-input-group-append>
            </b-input-group>
            <b-button variant="light" class="mt-3 mb-3 shadow-lg" type="submit"
              >LogIn</b-button
            >

            <hr class="mt-5" />

            <p class="text-light mt-5">
              Not registered yet? Not a problem.<br />
              <a @click="signUp" class="btn btn-link p-0 m-0 text-light"
                >Sign Up here to join our community.</a
              >
            </p>
          </b-form>
        </b-jumbotron>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      submitted: false,
    };
  },
  validations: {
    form: {
      email: {
        required,
      },
      password: {
        required,
      },
    },
  },
  methods: {
    ...mapActions(["userLogIn"]),

    logIn(event) {
      event.preventDefault();
      const { email, password } = this;
      this.$store
        .dispatch("userLogIn", { email, password })
        .then((res) => {
          if (res.status === 'error') {
            return this.$swal({
              icon: "error",
              title: "Nope!",
              text: res.error,
              showConfirmButton: false,
              timer: 1250,
              width: "280px",
            });
          } else {
            if (window.localStorage.getItem("userInformation")) {
              this.$router.push("/").catch((err) => {
                // Ignore the Vuex err regarding navigating to the page they are already on.
                if (
                  err.name !== "NavigationDuplicated" &&
                  !err.message.includes(
                    "Avoided redundant navigation to current location"
                  )
                ) {
                  // But print any other errors to the console
                  console.log(err);
                }
              });
            }
            return this.$swal({
              icon: "success",
              title: "Welcome",
              text: "Jump right in!",
              showConfirmButton: false,
              timer: 1250,
            });
          }
        })
        // .then(() => {
        //   if (window.localStorage.getItem("userInformation")) {
        //     this.$router.push("/").catch((err) => {
        //       // Ignore the Vuex err regarding navigating to the page they are already on.
        //       if (
        //         err.name !== "NavigationDuplicated" &&
                // !err.message.includes(
        //           "Avoided redundant navigation to current location"
        //         )
        //       ) {
        //         // But print any other errors to the console
        //         console.log(err);
        //       }
        //     });
        //   }
        //   this.$swal({
        //     icon: "success",
        //     title: "Welcome",
        //     text: "Jump right in!",
        //     showConfirmButton: false,
        //     timer: 1250,
        //   });
        // })
        .catch((error) => {
          return this.$swal({
            icon: "error",
            title: "OopsyDaisy...",
            text: "Something wrong! " + error,
          });
        });
    },
    signUp() {
      this.$router.push("/signup");
    },
  },
};
</script>