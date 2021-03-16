<template>
  <div>
    <b-container class="d-flex flex-column flex-nowrap align-items-center my-5">
      <img
        src="../assets/Images/edited/icon-left-font-monochrome-white.png"
        width="80%"
        alt="Groupomania logo"
        class="mb-5 pb-5"
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
          <b-form @submit.prevent="login({ email, password })" class="justify-content-center m-3">
            <label class="sr-only" for="form-input-email">Email</label>
            <b-form-input
              id="form-input-email"
              type="email"
              v-model="email"
              class="mb-3 shadow-lg"
              placeholder="janedoe@email.com"
              required
            ></b-form-input>

            <label class="sr-only" for="form-input-password">Password</label>
            <b-input-group class="mb-4">
              <b-form-input
                id="form-input-password"
                type="password"
                v-model="password"
                placeholder="Password"
                class="shadow-lg"
                required
              ></b-form-input>
            </b-input-group>

            <b-button variant="light" class="mt-3 shadow-lg" v-on:click="logIn()"
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
        email: "",
        password: "",
    };
  },
  methods: {
    logIn() {
      // this.$store.dispatch("login", {
      //   email: this.email,
      //   password: this.password
      // }).then(res => {
      this.$router.push("/Home");
    },
    // )
    // },
    register() {
      this.$router.push("/Register");
    },
  },
};
</script>