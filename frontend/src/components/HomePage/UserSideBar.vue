<template>
  <b-sidebar
    id="sidebar-right"
    text-variant="light"
    bg-variant="gradient-primary"
    backdrop-variant="dark"
    backdrop
    right
    shadow
  >
    <b-container class="d-flex flex-column">
      <p class="lead font-weight-normal text-light m-0 mt-4 text-left">
        Registered Users
      </p>
      <hr class="mt-2 bg-light w-50 mr-auto ml-0" />
      <b-container
        class="d-flex justify-content-center rounded ml-auto mr-auto"
      >
        <b-list-group class="w-75">
          <b-list-group-item
            v-for="user in loadUsers"
            :userid="user.userid"
            :firstname="user.firstname"
            :lastname="user.lastname"
            :registeredat="user.createdat"
            :key="user.userid"
            variant="outline-primary"
            class="text-primary mt-2 border-secondary shadow"
            >{{ user.firstname }} {{ user.lastname }}</b-list-group-item
          >
        </b-list-group>
      </b-container>
    </b-container>
  </b-sidebar>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
    this.loadAllUser(this.$store.getters.userDetails.userid);
  },
  methods: {
    ...mapActions(["loadAllUser"]),
    userProfile(userid) {
      this.$router.push({ path: "profile", query: { user: userid } });
    },
  },
  computed: {
    ...mapGetters(["loadUsers", "userDetails"]),
  },
};
</script>