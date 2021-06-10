<template>
  <div>
    <!-- Post Input -->
    <b-container class="rounded p-2">
      <b-form-group>
        <p class="lead font-weight-normal text-light m-0 text-left">
          Share a post
        </p>
        <hr class="mt-2 bg-light w-25 float-left" />
        <b-form-textarea
          no-resize
          placeholder="What are you thinking?"
          size="sm"
          id="postTextContent"
        ></b-form-textarea>
        <b-button variant="outline-light" type="submit" class="mt-3"
          >Post</b-button
        >
      </b-form-group>
    </b-container>
    <hr class="mt-4 bg-light w-75" />
    <!--===================================================-->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
  },
};
</script>
<style lang="scss" scoped>
$secondary: rgba(224, 224, 224, 0.233);

</style>