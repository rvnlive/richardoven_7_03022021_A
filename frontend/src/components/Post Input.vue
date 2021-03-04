<template>
  <b-container class="mt-5">
    <div class="well border border-light rounded bg-primary">
      <form class="form-horizontal" role="form">
        <h3 class="mt-3 text-light text-uppercase">
          How are you doing, Richard?
        </h3>
        <div class="form-group p-3">
          <b-form-input
            id="userpost-subject"
            placeholder="Post subject"
          ></b-form-input>
          <textarea
            class="form-control mt-3"
            id="userpost-data"
            placeholder="Update your status with any media or text"
          ></textarea>
        </div>
        <div class="mb-2">
          <a href="#"><b-icon icon="camera" class="h5 text-light"></b-icon></a>
          <a href="#"
            ><b-icon icon="camera-video" class="h5 text-light ml-3"></b-icon
          ></a>
          <a href="#"
            ><b-icon icon="image" class="h5 text-light ml-3"></b-icon
          ></a>
        </div>
        <div class="d-flex flex-row mb-2">
          <b-button class="ml-auto mr-auto bg-primary w-25 mb-2" type="button"
            >Post</b-button
          >
        </div>
      </form>
    </div>
  </b-container>
</template>
<script>
</script>
<style lang="scss">
// Post Input Text area non-resizable
.well textarea, textarea.form-control
{
   resize: none;
}
</style>