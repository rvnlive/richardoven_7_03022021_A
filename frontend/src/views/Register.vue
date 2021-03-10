<template>
  <div>
    <b-container class="d-flex flex-column flex-nowrap align-items-center mt-5">
      <img
        src="../assets/edited/icon-left-font-monochrome-black.png"
        width="80%"
        v-on:click="logIn()"
        alt="Groupomania logo"
        class="mb-5"
      />
      <b-container class="justify-content-center mb">
        <b-jumbotron class="col-md-8 shadow-lg bg-gradient-primary ml-md-auto mr-md-auto pb-4">
          <b-form class="justify-content-center mr-2 ml-2 mr-md-5 ml-md-5">
            <b-input-group prepend="First Name*" class="mb-2">
              <b-form-input
                id="form-input-firstname"
                type="text"
                placeholder="Jane"
                v-model="form.firstName"
                required
              ></b-form-input>
            </b-input-group>

            <b-input-group prepend="Last Name*" class="mb-2">
              <b-form-input
                id="form-input-lastname"
                type="text"
                placeholder="Doe"
                v-model="form.lastName"
                required
              ></b-form-input>
            </b-input-group>

            <b-input-group prepend="Email*" class="mb-2 mt-5" size="sm">
              <b-form-input
                id="form-input-email"
                type="email"
                placeholder="janedoe@email.com"
                v-model="form.email"
                required
              ></b-form-input>
            </b-input-group>

            <b-input-group prepend="Password*" class="mb-4" size="sm">
              <b-form-input
                id="form-input-password"
                type="password"
                placeholder="Password"
                v-model="form.password"
                required
              ></b-form-input>
            </b-input-group>
            <p class="text-light">
              We'll never share your email with anyone else.
            </p>

            <b-button variant="light" v-on:click="register()">SignUp</b-button>
            <p class="text-light mt-5 mb-0">* Details are required</p>
          </b-form>
        </b-jumbotron>
      </b-container>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
      logIn() {
this.$router.push("/")
      },
    register() {
      this.$router.push("/Profile");
    },
  },
};
</script>