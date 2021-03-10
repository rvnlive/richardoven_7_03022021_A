<template>
  <div>
    <b-navbar variant="gradient-primary" class="p-md-3" fixed fluid>
      <b-button v-b-toggle.sidebar-left variant="outline-light" size="sm"
        ><b-icon icon="menu-button-wide"></b-icon> Menu</b-button
      >
      <div class="clearfix ml-auto">
        <b-input-group size="sm" class="ml-auto">
          <b-form-input
            id="search-input"
            type="search"
            placeholder="Search..."
          />
        </b-input-group>
      </div>
    </b-navbar>
  </div>
</template>

<style lang="scss">
@media (max-width: 414.98px) {
  #search-input {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    width: 125px;
    -webkit-transition: all 600ms ease;
    -moz-transition: all 600ms ease;
    transition: all 600ms ease;
    float: right;
    &:hover,
    &:focus {
      box-shadow: 0 9px 30px 14px rgba(0, 0, 0, 0.534);
      width: 200px;
    }
  }
}
@media only screen and (min-width: 415px) {
  #search-input {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 5px;
    width: 200px;
    -webkit-transition: all 600ms ease;
    -moz-transition: all 600ms ease;
    transition: all 600ms ease;
    float: right;
    &:hover,
    &:focus {
      box-shadow: 0 9px 30px 14px rgba(0, 0, 0, 0.534);
      width: 350px;
    }
  }
}
</style>