<template>
  <div id="app" class="bg-info">
    <Navbar />
    <PostInput />
    <Feed />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import PostInput from './components/Post Input.vue'
import Feed from './components/Feed.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'navbar',
  components: {
    Navbar,
    PostInput,
    Feed,
    Footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
