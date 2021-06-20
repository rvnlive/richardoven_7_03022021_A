# Groupomania - OpenClassrooms Project 7 - Web Developer course

[Link to my project repository](https://github.com/rvnlive/richardoven_7_03022021_A)

<br>

>This page has been created by **`Richard Oven`** as a project for OpenClassrooms - Web Developer course.
>Project has been started on 2nd of March - 2021 and has been finalized on 17th of June - 2021

<br>

---

<br>

**Last project on the path. I've spent a bit more than 3 month on this project - as a beginner developer - to maximize the reusability for the future.**

The project includes different languages, such as ***`PostgreSQL`*** (database), ***`Javascript`*** (Standard) (back and front-end coding language), ***`VueJS with Bootstrap`*** /BootstrapVue/ (front-end framework), ***`CSS/SASS`*** (front-end styling language).

<br>

>It is a `Full-Stack Solution`.

<br>

The purpose of this project is to create an internal social-media web application for a company and its employees - called **`Groupomania`**.

<br>

---  
<br>

> ## Table of contents

* [About the project](#about-the-project)
* [Installation and Use](#installation-and-use)

<br>

---

## About the project

### The project made of 3 major parts

<br>

1. ***`Relational Database`***:

    > ***Logical connections between stored data***  

    The aim is to ***NOT*** to have null entries within the database. To prevent this I've built tables for the majority of user actions - such as **registering a profile, creating a post** - *within that a table for text content (if only that is being shared) and a table for media uploads (if only that is being shared)*, a table **for post views** (to easily identify which other user's post has been read already), a table **for post likes** and **also a comment table** (going to contain the comments been left on the post).  
These tables are passing relevant information - such as **userId or postId** - to each other, making stable connections between each of them and letting us to re-use any information from them at any stage of development or point of time.

<br>

---

<br>

2. ***`Back-end`***:

    > ***Bridge between database and Front-end***

    It has been built on top of **Node.JS** with **Express**.  

    - There are other packages being used, such as:

        * **`JWT`** (*JSON Web Token for authorization purposes* - securing the connection with database & back-end)
        * **`Bcrypt`** (*for password-hashing & comparison*)
        * **`CORS`** (*it is/and for Cross-Origin resource sharing*)
        * **`DOTENV`** (*for separated environment variables - .env file*)
        * **`Sequelize`** (*it is an ORML - Object-Relational Mapping Library*: speeds up query writing time, synchronizing database, validates database model(s) etc.)
        * **`PG`** (*for PostgreSQL features*)  
        <br>

    - `Back-end` also contains:  

        * **Models**: A model represents a table in the database. The model tells `Sequelize` several things about the entity it represents, such as the *name of the table in the database and which columns it has (and their data types)*.  
        
        <br>
        
        > Example (*my `userModel`*):  

        ```javascript
            // const Sequelize = require('sequelize')
            module.exports = function (sequelize, DataTypes) {
              return sequelize.define('users', {
                userid: {
                  autoIncrement: true,
                  autoIncrementIdentity: true,
                  type: DataTypes.INTEGER,
                  allowNull: false,
                  primaryKey: true
                },
                firstname: {
                  type: DataTypes.STRING(100),
                  allowNull: true
                },
                lastname: {
                  type: DataTypes.STRING(100),
                  allowNull: true
                },
                email: {
                  type: DataTypes.STRING(100),
                  allowNull: true
                },
                password: {
                  type: DataTypes.STRING(255),
                  allowNull: true
                }
                }, {
                    sequelize,
                    tableName: 'users',
                    schema: 'ocproject7',
                    timestamps: true,
                    indexes: [
                        {
                        name: 'pk_users_userid',
                        unique: true,
                            fields: [
                            { name: 'userid' }
                            ]
                        }
                    ]
              })
            }
        ```

        * **Controllers**: Controllers are giving responses to each requests. Every request has been `routed` to a `controller`.  
        
        <br>

        > Example (*my `signUpUser` controller*):  

        ```javascript
        /**  Creating a user entry in database **/
        exports.signUpUser = (req, res) => {
            const { firstName, lastName, email, password } = req.body
              // Validating our database entries
              // It is being validated first at FrontEnd, but you can never be sure.
              if (isEmpty(firstName) || isEmpty(lastName) || isEmpty(email) || isEmpty(password)) {
                errorMessage.error = 'Fields can NOT be empty'
                console.log(errorMessage.error)
                return res.status(status.bad).send(errorMessage)
              }
              if (!isValidEmail(email)) {
                errorMessage.error = 'Please enter a valid Email'
                return res.status(status.bad).send(errorMessage)
              }
              if (!validatePassword(password)) {
                errorMessage.error = 'Password must be more than five(5) characters'
                return res.status(status.bad).send(errorMessage)
              }
              // Creating a hashed (securely stored) password
              const hashedPassword = hashPassword(password)
              /// ///////////////////////////////////////////////
              // Lets 'Find or Create' our User
              User
                .findOrCreate({
                  where: { email: email },
                  defaults: {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: hashedPassword
                  }
                })
                // Find or Create results an array
                // [object, created (<- it is a boolean: if created: true / existing: false )]
               .then((result) => {
                const [user, created] = result
                // console.log(user)
                if (created) {
                return res.json({ userCreated: created })
                } else if (!created){
                errorMessage.error = 'Existing user!'
                return res.status(status.conflict).send(errorMessage)
              }
            })
            .catch(error => console.log('Operation was not successful ' + error)
            )
        }
        ```

        * **Routes**: Routes are directing the client requests. Every route must have a `method` *(defines the type of request (GET, POST, PUT, DELETE etc.))*, a `path` *('/signup')* and a `handler` *or with other word: a `controller`*.   
        
        <br>

        > Example (*my `signUp` route*):

        ```javascript
        router.post('/signup', userController.signUpUser)
        ```

<br>

---

<br>

3. ***`Front-end`***:

    > ***where everything starts from: the User Interface***

    It has been built on top of a combination of **VueJS** and **Bootstrap** - called **BootstrapVue**.  

    - There are other packages being used, such as:

        * **`Axios`** (*for sending `Asynchronous` HTTP request to REST (*Representational State Transfer - make use of existing protocols*) endpoints for performing CRUD operation(s)*)
        * **`Moment`** (*for formatting Date and Time*)
        * **`NProgress`** (*for loading bar*)
        * **`Vue-Router`** (*helps to link browserURL/History with VueJS component rendering*)
        * **`Vue-SweetAlert2`** (*for customizing modal alerts*)
        * **`Vuex`** (*State Management pattern + library*: allowing us to store all the data received from any server in a centralized way, also ensuring that the `state` *(where the data being kept)* can **ONLY** be mutated *(changed/updated)* in a predictable way. - `!NOTE: on page reload, the data is being lost` - *page reload not means the use of integrated functions or modules, but 'hitting reload' or 'retyping page URL' etc.*)
        
        <br>  

    - `Front-end` also contains:  

        * **public/index.html**: a `HTML` file containing the base html for the browser - which includes the call for our **`VueJS app`** -> *(`app.vue`)*.  
        
        <br>

        > Example (*my `index.html`*):  

        ```html
        <!DOCTYPE html>
        <html lang="en-en">
            <head>
                <meta charset="utf-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <link rel="icon" href="<%= BASE_URL %>favicon.ico">
                <title><%= htmlWebpackPlugin.options.title %></title>
            </head>
            <body>
                <noscript>
                    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
                </noscript>
                <div id="app"></div>
                <!-- built files will be auto injected -->
            </body>
        </html>
        ```

        * **src/views**: a collection of `.vue` files - each containing a different main page which going to call their relevant component(s).   
        
        <br>
        
        > Example (*my `LogIn.vue`*):  

        ```html
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
        ```

        * **src/components**: a collection of `.vue` files - each containing a different page module with their relevant function.     
        
        <br>
        
        > Example (*my `LikeButton.vue`*):  

        ```html
        <template>
          <div>
            <b-container class="d-flex flex-row">
                  <b-button
                    size="sm"
                    variant="outline-secondary"
                    @click="takeALike"
                    v-if="isLiked"
                    ><b-icon icon="hand-thumbs-up" class="mr-1"></b-icon
                    >{{ likeLength }} Like</b-button
                  >
                  <b-button size="sm" variant="outline-light" @click="giveALike" v-else-if="!isLiked"
                    ><b-icon icon="hand-thumbs-up" class="mr-1"></b-icon
                    >{{ likeLength }} Like</b-button
                  >
            </b-container>
          </div>
        </template>
        <script>
        import { mapActions, mapGetters } from "vuex";
        export default {
          data() {
            return {
              activeUserID: this.$store.getters.userDetails.userid,
            };
          },
          computed: {
            ...mapGetters(["getAllLikes", "userDetails"]),
            userID() {
              return this.userDetails.userid;
            },
            likeLength() {
              return this.getAllLikes.length;
            },
            listAllLikes() {
              return this.getAllLikes;
            },
            isLiked() {
              return this.listAllLikes.find(
                (user) => user.userid === this.activeUserID
              );
            },
          },
          methods: {
            ...mapActions(["giveLike", "takeLike"]),
            giveALike() {
              const userid = this.$store.getters.userDetails.userid;
              const id = this.$store.getters.loadChosenPost[0].postid;
              this.$store
                .dispatch("giveLike", { userid, id })
                .then(() => {
                  return this.$swal({
                    icon: "success",
                    title: "Nice one!",
                    showConfirmButton: false,
                    timer: 1250,
                    width: "280px",
                  });
                })
                .catch((error) => console.log(error));
            },
            takeALike() {
              const userid = this.$store.getters.userDetails.userid;
              const id = this.$store.getters.loadChosenPost[0].postid;
              this.$store
                .dispatch("takeLike", { userid, id })
                .then(() => {
                  return this.$swal({
                    icon: "success",
                    title: "Nice one!",
                    showConfirmButton: false,
                    timer: 1250,
                    width: "280px",
                  });
                })
                .catch((error) => console.log(error));
            },
          },
        };
        </script>
        ```

        * **src/store**: `Vuex` centralizing requested data into a `vuex` **state** for the app components to use *(retrieve with `getters`, modify/update existing state with `mutations` and send/request data with `actions`)* at any point.   
        
        <br>

        > Example (*my `userAuthentication.js`*):  

        ```javascript
        const baseUrl = 'http://localhost:3000/'

        export default {
          state: {
            userInformation: [],
            userLoggedIn: []
          },

          mutations: {
            logInUser (state, response) {
              state.userInformation = response
              state.userLoggedIn = true
            },
            logOutUser (state) {
              state.userInformation = []
              state.userLoggedIn = []
            },
            deleteUser (state) {
              state.userInformation = []
              state.userLoggedIn = []
            }
          },

          actions: {
            userLogIn ({ commit, dispatch }, { email, password }) {
              return new Promise((resolve, reject) => {
                const logInRequestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password })
                }
                window.fetch(baseUrl + 'api/auth/login', logInRequestOptions)
                  .then(response => {
                    return response.json()
                  })
                  .then(response => {
                    if (response.token) {
                      commit('logInUser', response)
                      commit('clearOutPostState')
                      commit('clearOutLikeState')
                      commit('clearOutCommentsState')
                      dispatch('loadAllPosts')
                    }
                    resolve(response)
                  })
                  .catch(error => {
                    reject(error)
                  })
              })
            },
            userLogOut ({ commit }) {
              commit('logOutUser')
            },
            userDelete ({ commit, dispatch, getters }, userid) {
              const userDeleteRequestOptions = {
                method: 'DELETE',
                headers: getters.getHeader
              }
              window.fetch(baseUrl + `api/auth/${userid}`, userDeleteRequestOptions)
                .then(() => {
                  commit('deleteUser')
                  dispatch('userLogOut')
                })
                .catch(error => {
                  console.log(error)
                })
            }
          },

          getters: {
            userDetails: state => state.userInformation,
            isLoggedIn: state => state.userLoggedIn,
            getHeader: state => ({ Authorization: 'Bearer ' + state.userInformation.token })
          }
        }

        ```

        * **src/route**: `Vue-router` deeply integrates with `VueJS`. It offers a variety of features, such as: *nested route/view mapping, modular/component based router configuration, route params/query etc.*   
        
        <br>

        > Example (*part my `route/index.js`*):  

        ```javascript
        // Creating routes
        const router = new VueRouter({
          scrollBehavior () {
            return window.scrollTo({ top: 0, behavior: 'smooth' })
          },
          mode: 'history',
          routes: [
            {
              path: '/login',
              name: 'LogIn',
              component: logIn,
              meta: {
                title: 'LogIn',
                meta: [
                  {
                    name: 'description',
                    content: 'Groupomania\'s login page.'
                  },
                  {
                    property: 'og:description',
                    content: 'Groupomania\'s login page.'
                  }
                ]
              }
            },
            {
              path: '/signup',
              name: 'SignUp',
              component: signUp,
              meta: {
                title: 'SignUp',
                meta: [
                  {
                    name: 'description',
                    content: 'Groupomania\'s signup page.'
                  },
                  {
                    property: 'og:description',
                    content: 'Groupomania\'s signup page.'
                  }
                ]
              }
            },
            {
              path: '/',
              name: 'Home',
              // Lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "Home" */ '../views/Home'),
              meta: {
                title: 'Home',
                meta: [
                  {
                    name: 'description',
                    content: 'Groupomania\'s home page.'
                  },
                  {
                    property: 'og:description',
                    content: 'Groupomania\'s home page.'
                  },
                  {
                    requiresAuth: true
                  }
                ]
              }
            },
            {
              path: '/post',
              name: 'Post',
              // Lazy-loaded when the route is visited.
              component: () => import(/* webpackChunkName: "Profile" */ '../views/Post'),
              meta: {
                title: 'Post',
                meta: [
                  {
                    name: 'description',
                    content: 'Groupomania\'s user post page.'
                  },
                  {
                    property: 'og:description',
                    content: 'Groupomania\'s user post page.'
                  },
                  {
                    requiresAuth: true
                  }
                ]
              }
            },
            // Otherwise redirect to home
            { path: '*', redirect: '/' }
          ]
        })
        
        // Redirect to 'login' page if not logged in and trying to access any restricted page
        router.beforeEach((to, from, next) => {
          const publicPages = ['/login', '/signup']
          const authRequired = !publicPages.includes(to.path)
          const loggedIn = store.getters.isLoggedIn
        
          if (authRequired && loggedIn !== true) {
            return next('/login')
          }
        
          next()
        })
        
        export default router

        ```

---

## Installation and Use
---

- ### Installation process

    > Please Note: the `backend` folder contains a `.sql` script file - called:           ***groupomania-postgres-script***. Before you start the installation process,     please    [download and install PostgreSQL](https://www.postgresql.org/download/)     for the use    of this script and to create the database - so for the same  structure which has been   used in this project.

    Whenever you are ready, open the **terminal** in the root of the project folder,      then   navigate to the **backend** folder:  
    >`cd backend`  

    Then - to install back-end **dependencies** - type:  
    >`npm install`  

    Then open another **terminal tab** in the project root and navigate to    **frontend**     folder:  
    >`cd frontend`  

    Then - to install front-end **dependencies** - type:  
    >`npm install`

---

- ### Usage

    > *Running back & front-end server, establishing back-end connection with database*

    - To run **back-end server**, go back to the **terminal tab** which has the `'\backend>'` path and type:  

        >`nodemon run`  
    
    - To establish PostgreSQL **database connection** with back-end, first make sure your `Postgres` database application is up and running, then **either**:  
        >create a file - called `.env` in the `backend` folder and add the following:  

        ```
        // Postgres DB Connection
        USER= // Your postgres Username // e.g. postgres
        PASSWORD= // Your postgres Password // e.g. postgres
        HOST= // Your host // e.g. localhost
        DATABASE= // Your database name // e.g. groupomania
        SCHEMA= // Your Database Schema name // e.g. ocproject7
        PORT= // Your backend port! -> e.g. 3000
        
        // JWT Secret Key
        SECRET= // Your secret key // e.g. he#59k4p!276ct
        ```

        >**OR**  
         edit the file - called `.env-example` from `backend` folder - to your needs, then re-name it to `.env`.  
         
         <br>

        > Then on **successful connection** (*to the database and server*), you must see the following in your **back-end terminal tab**:  

        ```
        Listening on port 3000
        Executing (default): SELECT 1+1 AS result
        Database connection Live!
        ```  
        
        <br>

    - To run **front-end server**, go back to the **terminal tab** which has the     `'\frontend>'` path and type:  

        >`npm run serve`  

        > Then on **successful connection** (*to the database and server*), you  must see the following in your **back-end terminal tab**:  

        ```
        DONE  Compiled successfully in 205ms                    13:30:06

        App running at:
        - Local:   http://localhost:8081/
        - Network: http://192.168.0.9:8081/
        ```  

<br>

Thank You for visiting my project! I appreciate every feedback!