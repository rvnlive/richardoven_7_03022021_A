<template>
  <div>
    <b-container class="d-flex flex-column flex-nowrap align-items-center">
      <img
        src="../assets/Images/edited/icon-left-font-monochrome-white.png"
        width="80%"
        @click="logIn"
        alt="Groupomania logo"
        class="mb-3 mb-md-5 pb-md-5 mt-4"
      />
      <b-container class="justify-content-center mb">
        <b-jumbotron
          class="
            col-md-8
            shadow-lg
            bg-gradient-primary
            ml-md-auto
            mr-md-auto
            pb-4
          "
        >
          <b-form @submit.prevent="signUp" enctype="multipart/form-data">
            <b-form class="justify-content-center mr-2 ml-2 mr-md-5 ml-md-5">
              <b-input-group class="mb-2">
                <b-form-input
                  id="form-input-firstname"
                  type="text"
                  placeholder="Your first name"
                  v-model="$v.form.firstName.$model"
                  required
                  :formatter="formatter"
                  lazy-formatter
                ></b-form-input>
              </b-input-group>

              <b-input-group class="mb-2">
                <b-form-input
                  id="form-input-lastname"
                  type="text"
                  placeholder="Your last name"
                  v-model="$v.form.lastName.$model"
                  required
                  :formatter="formatter"
                  lazy-formatter
                ></b-form-input>
              </b-input-group>

              <b-input-group class="mb-2 mt-4">
                <b-form-input
                  id="form-input-email"
                  type="email"
                  placeholder="Your email"
                  v-model="$v.form.email.$model"
                  required
                ></b-form-input>
              </b-input-group>

              <p class="text-light mt-5">
                Passwords must contain: letter, number, special character.<br />
                Must be between 8 to 12 characters.
              </p>
              <b-input-group class="mb-2" size="sm">
                <b-form-input
                  id="form-input-password"
                  type="password"
                  placeholder="Password"
                  v-model="$v.form.password.$model"
                  :state="validateState('password')"
                  required
                ></b-form-input>
              </b-input-group>
              <b-input-group class="mb-4" size="sm">
                <b-form-input
                  id="form-input-password"
                  type="password"
                  placeholder="Confirm Password"
                  v-model="$v.form.confirmedPassword.$model"
                  :state="validateState('confirmedPassword')"
                  required
                ></b-form-input>
                <p
                  class="text-light text-center p-1"
                  v-if="!$v.form.confirmedPassword.sameAsPassword"
                >
                  The passwords do not match.
                </p>
              </b-input-group>
              <p class="text-light m-0">
                We'll never share your details with anyone.
              </p>
              <p class="text-light mt-0">All the details above are required.</p>
              <b-button variant="light" @click="signUp">SignUp</b-button>

              <hr class="mt-3" />

              <b-button class="btn-sm" variant="light" @click="logIn"
                >Back to LogIn</b-button
              >
            </b-form>
          </b-form>
        </b-jumbotron>
      </b-container>
    </b-container>
  </div>
</template>
<script>
import { required, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmedPassword: "",
      },
    };
  },
  validations: {
    form: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
      },
      password: {
        required,
        strongPassword(password) {
          return (
            /[a-z]/.test(password) &&
            /[0-9]/.test(password) &&
            /\W|_/.test(password) &&
            password.length >= 8 &&
            password.length <= 12
          );
        },
      },
      confirmedPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
    },
  },
  methods: {
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    formatter(value) {
      return value
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
        .join(" ");
    },
    signUp() {
      this.$v.form.$touch();
      try {
        if (this.$v.form.$anyError) {
          return this.$swal({
            icon: "error",
            title: "No panic...",
            text: "Check your information and try again!",
            showConfirmButton: true,
            timer: 4000,
          });
        } else {
          axios
            .post("http://localhost:3000/api/auth/signup", this.form)
            .then((res) => {
              if (res.status === 200) {
                return this.$swal({
                  icon: "success",
                  title: "Registration successful!",
                  confirmButtonText: "LogIn",
                  confirmButtonColor: "#6d52cfce",
                  text: "Now you can login.",
                  showCloseButton: false,
                }).then(function (result) {
                  if (result.value) {
                    window.location = "/login";
                  }
                });
              }
            })
            .catch((error) => {
              if (error.response.status === 409) {
                return this.$swal({
                  icon: "info",
                  title: "Existing User!",
                  confirmButtonText: "LogIn",
                  confirmButtonColor: "#6d52cfce",
                  text: "Please, log in!",
                  showCloseButton: false,
                }).then(function (result) {
                  if (result.value) {
                    window.location = "/login";
                  }
                });
              } else {
                return this.$swal({
                  icon: "error",
                  title: "OopsyDaisy...",
                  text: "Something went wrong: " + error,
                })
              }
            });
        }
      } catch (err) {
        console.log(err);
      }
    },
    logIn() {
      this.$router.push("/login");
    },
  },
};
</script>