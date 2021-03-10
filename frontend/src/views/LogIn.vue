<template>
  <div>
    <b-container class="d-flex flex-column flex-nowrap align-items-center my-5">
      <img
        src="../assets/edited/icon-left-font-monochrome-black.png"
        width="80%"
        alt="Groupomania logo"
        class="mb-5"
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
            <p>Build internal friendships</p>
          </b-container>
        </b-jumbotron>
        <!-- LogIn and Register side -->
        <b-jumbotron class="mw-50 shadow-lg bg-gradient-primary">
          <b-form class="justify-content-center m-3">
            <label class="sr-only" for="form-input-email">Email</label>
            <b-form-input
              id="form-input-email"
              type="email"
              class="mb-3 shadow-lg"
              placeholder="janedoe@email.com"
              required
            ></b-form-input>

            <label class="sr-only" for="form-input-password">Password</label>
            <b-input-group class="mb-4">
              <b-form-input
                id="form-input-password"
                type="password"
                placeholder="Password"
                class="shadow-lg"
                required
              ></b-form-input>
            </b-input-group>

            <b-form-checkbox class="mb-5 text-light"
              >Remember me</b-form-checkbox
            >

            <b-button variant="light" class="shadow-lg" v-on:click="logIn()"
              >LogIn</b-button
            >

            <hr class="mt-4 mb-4" />
            
            <b-button variant="light" class="shadow-lg" v-on:click="register()"
              >SignUp</b-button
            >
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
        email: "",
        password: "",
      },
    };
  },
  methods: {
    logIn() {
      this.$router.push("/Home");
    },
    register() {
      this.$router.push("/Register");
    },
  },
};
</script>